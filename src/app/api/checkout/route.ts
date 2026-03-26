import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/config";
import type { CartItem } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customer_name, customer_phone, pickup_time } = body as {
      items: CartItem[];
      customer_name: string;
      customer_phone: string;
      pickup_time: string;
    };

    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Create line items for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price, // already in cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout Session
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/checkout`,
      metadata: {
        customer_name,
        customer_phone,
        pickup_time,
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
