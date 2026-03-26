"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  // Clear cart on mount
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const orderNumber = sessionId ? sessionId.slice(-8).toUpperCase() : "------";

  return (
    <div className="max-w-lg mx-auto">
      {/* Mascot placeholder */}
      <div className="text-8xl mb-6" aria-hidden="true">
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <span role="img" aria-label="pig and fire">🐷🔥</span>
      </div>

      <h1 className="font-display text-5xl md:text-6xl text-heat-ember uppercase tracking-wider mb-4">
        Order Confirmed!
      </h1>

      <p className="font-body text-xl text-heat-white mb-2">
        Your order has been placed!
      </p>

      <p className="font-body text-heat-smoke mb-6">
        We&apos;ll have it ready and smokin&apos; hot for you.
      </p>

      <div className="border-4 border-heat-charcoal p-6 mb-8">
        <div className="mb-4">
          <span className="font-display text-sm text-heat-smoke uppercase tracking-wider">
            Order Number
          </span>
          <p className="font-display text-3xl text-heat-white tracking-widest">
            #{orderNumber}
          </p>
        </div>
      </div>

      <Link href="/">
        <Button variant="primary" size="xl" sizzle>
          Back to Home
        </Button>
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-heat-black flex flex-col items-center justify-center px-4 text-center">
      <Suspense
        fallback={
          <p className="font-display text-2xl text-heat-smoke uppercase tracking-wider">
            Loading...
          </p>
        }
      >
        <SuccessContent />
      </Suspense>
    </main>
  );
}
