"use client";

import type { Order, OrderStatus } from "@/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { formatPrice } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
  onStatusUpdate: (orderId: string, newStatus: OrderStatus) => void;
}

const nextStatus: Partial<Record<OrderStatus, { label: string; next: OrderStatus }>> = {
  pending: { label: "CONFIRM", next: "confirmed" },
  confirmed: { label: "MARK READY", next: "ready" },
  ready: { label: "MARK PICKED UP", next: "picked_up" },
};

export function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  const action = nextStatus[order.status];

  const pickupFormatted = order.pickup_time
    ? new Date(order.pickup_time).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "Not set";

  return (
    <Card className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-heat-smoke">
            #{order.id.slice(-8).toUpperCase()}
          </p>
          <h3 className="font-display text-lg text-heat-white tracking-wider">
            {order.customer_name}
          </h3>
          <p className="text-sm text-heat-smoke">{order.customer_phone}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Items */}
      <ul className="space-y-1 border-t-2 border-heat-charcoal pt-3">
        {order.items.map((item) => (
          <li
            key={item.menu_item_id}
            className="flex justify-between text-sm text-heat-white"
          >
            <span>
              {item.name} &times; {item.quantity}
            </span>
            <span className="text-heat-smoke">
              {formatPrice(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex items-center justify-between border-t-2 border-heat-charcoal pt-3">
        <div>
          <p className="text-xs text-heat-smoke uppercase tracking-widest">
            Pickup: {pickupFormatted}
          </p>
          <p className="font-display text-xl text-heat-ember tracking-wider">
            {formatPrice(order.total)}
          </p>
        </div>

        {action && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => onStatusUpdate(order.id, action.next)}
          >
            {action.label}
          </Button>
        )}
      </div>
    </Card>
  );
}
