"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";

function generateTimeSlots(): string[] {
  const slots: string[] = ["ASAP"];
  const now = new Date();
  // Round up to next 15-min increment
  const minutes = now.getMinutes();
  const roundedMinutes = Math.ceil(minutes / 15) * 15 + 15; // start at least 15 min from now
  const start = new Date(now);
  start.setMinutes(roundedMinutes, 0, 0);

  for (let i = 0; i < 12; i++) {
    const slot = new Date(start.getTime() + i * 15 * 60 * 1000);
    const hours = slot.getHours();
    const mins = slot.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 || 12;
    slots.push(`${displayHour}:${mins} ${ampm}`);
  }

  return slots;
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("ASAP");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const timeSlots = generateTimeSlots();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-heat-black flex flex-col items-center justify-center px-4">
        <h1 className="font-display text-4xl md:text-5xl text-heat-white uppercase tracking-wider mb-6">
          Your cart is empty
        </h1>
        <Link href="/menu">
          <Button variant="primary" size="lg" sizzle>
            Back to Menu
          </Button>
        </Link>
      </main>
    );
  }

  async function handleCheckout() {
    if (!customerName.trim() || !customerPhone.trim()) {
      setError("Name and phone are required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          pickup_time: pickupTime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Checkout failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-heat-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-5xl md:text-6xl text-heat-white uppercase tracking-wider text-center mb-10">
          Checkout
        </h1>

        {/* Order Summary */}
        <section className="border-4 border-heat-charcoal p-6 mb-8">
          <h2 className="font-display text-2xl text-heat-red uppercase tracking-wider mb-4">
            Order Summary
          </h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.menu_item_id}
                className="flex justify-between items-center text-heat-white font-body"
              >
                <div>
                  <span className="text-heat-smoke">{item.quantity}x</span>{" "}
                  {item.name}
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-heat-smoke text-sm">
                    @ {formatPrice(item.price)}
                  </span>
                  <span className="font-display">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t-4 border-heat-charcoal mt-4 pt-4 flex justify-between items-center">
            <span className="font-display text-xl text-heat-white uppercase tracking-wider">
              Subtotal
            </span>
            <span className="font-display text-2xl text-heat-ember">
              {formatPrice(total)}
            </span>
          </div>
        </section>

        {/* Customer Info */}
        <section className="border-4 border-heat-charcoal p-6 mb-8">
          <h2 className="font-display text-2xl text-heat-red uppercase tracking-wider mb-4">
            Your Info
          </h2>
          <div className="space-y-4">
            <Input
              id="customer-name"
              label="Name"
              placeholder="Your name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
            <Input
              id="customer-phone"
              label="Phone"
              type="tel"
              placeholder="(555) 555-5555"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
            />
            <div>
              <label
                htmlFor="pickup-time"
                className="block font-display uppercase tracking-widest text-sm text-heat-white mb-2"
              >
                Pickup Time
              </label>
              <select
                id="pickup-time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full bg-heat-black text-heat-white border-4 border-heat-charcoal px-4 py-3 font-body text-base focus:border-heat-red focus:outline-none focus:ring-2 focus:ring-heat-red/50 transition-colors"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Error */}
        {error && (
          <p className="text-heat-red font-body text-center mb-4">{error}</p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-4 items-center">
          <Button
            variant="primary"
            size="xl"
            sizzle
            onClick={handleCheckout}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Processing..." : "Pay Now"}
          </Button>
          <Link
            href="/menu"
            className="font-display text-heat-smoke uppercase tracking-wider hover:text-heat-white transition-colors"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
