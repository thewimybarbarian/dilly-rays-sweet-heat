import type { OrderStatus } from "@/types";
import { Badge } from "@/components/ui/Badge";

const statusConfig: Record<OrderStatus, { variant?: "yellow" | "orange" | "gray"; className?: string }> = {
  pending: { variant: "yellow" },
  confirmed: { variant: "orange" },
  ready: { className: "bg-green-600 text-white border-green-700" },
  picked_up: { variant: "gray" },
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant ?? "gray"} className={config.className ?? ""}>
      {status.replace("_", " ")}
    </Badge>
  );
}
