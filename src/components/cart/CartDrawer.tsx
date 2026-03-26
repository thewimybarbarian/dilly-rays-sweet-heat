"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import CartItem from "./CartItem";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, clearCart } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l-4 border-heat-red bg-heat-black"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-heat-charcoal px-6 py-4">
              <h2 className="font-display text-xl tracking-[0.2em] uppercase text-heat-white">
                Your Order
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-heat-white hover:text-heat-red transition-colors"
                aria-label="Close cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items list (scrollable) */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
                  <p className="font-display text-lg tracking-wider uppercase text-heat-smoke">
                    Your cart is empty
                  </p>
                  <Link href="/menu" onClick={onClose}>
                    <Button variant="secondary" size="md">
                      Browse Menu
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="py-2">
                  {items.map((item) => (
                    <CartItem key={item.menu_item_id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-heat-charcoal px-6 py-4 space-y-3">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm tracking-wider uppercase text-heat-smoke">
                    Subtotal
                  </span>
                  <span className="font-display text-lg text-heat-white">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Checkout button */}
                <Link href="/checkout" onClick={onClose} className="block">
                  <Button variant="primary" size="xl" className="w-full">
                    Checkout
                  </Button>
                </Link>

                {/* Clear all */}
                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full text-center font-display text-xs tracking-wider uppercase text-heat-smoke hover:text-heat-red transition-colors py-1"
                >
                  Clear All
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
