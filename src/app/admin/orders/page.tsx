"use client";

import { useState } from "react";
import type { Order, OrderStatus } from "@/types";
import { OrderCard } from "@/components/admin/OrderCard";

const STATUS_FILTERS = ["all", "pending", "confirmed", "ready", "picked_up"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

const FILTER_LABELS: Record<StatusFilter, string> = {
  all: "All",
  pending: "Pending",
  confirmed: "Confirmed",
  ready: "Ready",
  picked_up: "Picked Up",
};

const MOCK_ORDERS: Order[] = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    items: [
      { menu_item_id: "1", name: "Pulled Pork Sandwich", price: 1299, quantity: 2 },
      { menu_item_id: "5", name: "Jalapeno Mac & Cheese", price: 699, quantity: 1 },
    ],
    total: 3297,
    status: "confirmed",
    customer_name: "John Smith",
    customer_phone: "(615) 555-0123",
    pickup_time: "2026-03-26T12:30:00Z",
    stripe_session_id: "cs_test_123",
    created_at: "2026-03-26T12:00:00Z",
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    items: [
      { menu_item_id: "2", name: "Brisket Plate", price: 1699, quantity: 1 },
      { menu_item_id: "6", name: "Sweet Tea", price: 349, quantity: 2 },
    ],
    total: 2397,
    status: "pending",
    customer_name: "Sarah Johnson",
    customer_phone: "(615) 555-0456",
    pickup_time: "2026-03-26T13:00:00Z",
    stripe_session_id: "cs_test_456",
    created_at: "2026-03-26T12:15:00Z",
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    items: [
      { menu_item_id: "3", name: "Smoked Wings (6pc)", price: 1099, quantity: 1 },
    ],
    total: 1099,
    status: "ready",
    customer_name: "Mike Davis",
    customer_phone: "(615) 555-0789",
    pickup_time: "2026-03-26T12:15:00Z",
    stripe_session_id: "cs_test_789",
    created_at: "2026-03-26T11:45:00Z",
  },
  {
    id: "d4e5f6a7-b8c9-0123-defa-234567890123",
    items: [
      { menu_item_id: "4", name: "Ribs Half Rack", price: 1899, quantity: 1 },
      { menu_item_id: "5", name: "Jalapeno Mac & Cheese", price: 699, quantity: 2 },
    ],
    total: 3297,
    status: "picked_up",
    customer_name: "Emily Chen",
    customer_phone: "(615) 555-0321",
    pickup_time: "2026-03-26T11:30:00Z",
    stripe_session_id: "cs_test_321",
    created_at: "2026-03-26T11:00:00Z",
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [filter, setFilter] = useState<StatusFilter>("all");

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div>
      <h1 className="font-display text-4xl text-heat-red tracking-widest mb-8">
        ORDERS
      </h1>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 font-display text-sm uppercase tracking-widest border-2 transition-colors cursor-pointer ${
              filter === status
                ? "bg-heat-red text-heat-white border-heat-red"
                : "bg-transparent text-heat-smoke border-heat-charcoal hover:border-heat-red hover:text-heat-white"
            }`}
          >
            {FILTER_LABELS[status]}
          </button>
        ))}
      </div>

      {/* Orders grid */}
      {filteredOrders.length === 0 ? (
        <p className="text-heat-smoke font-display tracking-widest">
          No orders match this filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
