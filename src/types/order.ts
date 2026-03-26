import type { CartItem } from "./cart";

export type OrderStatus = "pending" | "confirmed" | "ready" | "picked_up";

export interface Order {
  id: string;
  items: CartItem[];
  total: number; // cents
  status: OrderStatus;
  customer_name: string;
  customer_phone: string;
  pickup_time: string | null;
  stripe_session_id: string | null;
  created_at: string;
}
