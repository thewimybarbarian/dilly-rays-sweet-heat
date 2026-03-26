"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-heat-charcoal">
      {/* Name + unit price */}
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm tracking-wider uppercase text-heat-white truncate">
          {item.name}
        </p>
        <p className="text-xs text-heat-smoke">{formatPrice(item.price)} each</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => updateQuantity(item.menu_item_id, item.quantity - 1)}
          className="flex h-7 w-7 items-center justify-center border border-heat-charcoal text-heat-white hover:border-heat-red hover:text-heat-red transition-colors text-sm font-bold"
          aria-label={`Decrease quantity of ${item.name}`}
        >
          &minus;
        </button>
        <span className="w-6 text-center text-sm font-bold text-heat-white">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={() => updateQuantity(item.menu_item_id, item.quantity + 1)}
          className="flex h-7 w-7 items-center justify-center border border-heat-charcoal text-heat-white hover:border-heat-red hover:text-heat-red transition-colors text-sm font-bold"
          aria-label={`Increase quantity of ${item.name}`}
        >
          +
        </button>
      </div>

      {/* Line total */}
      <span className="w-16 text-right font-display text-sm text-heat-red">
        {formatPrice(item.price * item.quantity)}
      </span>

      {/* Remove button */}
      <button
        type="button"
        onClick={() => removeItem(item.menu_item_id)}
        className="ml-1 text-heat-smoke hover:text-heat-red transition-colors"
        aria-label={`Remove ${item.name} from cart`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
