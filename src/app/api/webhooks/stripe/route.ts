import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/config";
import { createAdminClient } from "@/lib/supabase/server";
import type { CartItem } from "@/types";
import type { Json } from "@/lib/supabase/types";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata;

    if (!metadata) {
      return NextResponse.json({ error: "No metadata" }, { status: 400 });
    }

    const items: CartItem[] = JSON.parse(metadata.items || "[]");
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const supabase = createAdminClient();
    const { error } = await supabase.from("orders").insert({
      items: items as unknown as Json,
      total,
      status: "confirmed",
      customer_name: metadata.customer_name,
      customer_phone: metadata.customer_phone,
      pickup_time: metadata.pickup_time || null,
      stripe_session_id: session.id,
    });

    if (error) {
      console.error("Failed to insert order:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
