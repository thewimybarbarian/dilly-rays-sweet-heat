"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import HeatRating from "@/components/menu/HeatRating";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import type { MenuItem } from "@/types";

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Card glow={item.heat_level >= 4} className="flex flex-col justify-between gap-4">
      <div className="space-y-2">
        <h3 className="font-display text-2xl text-heat-white uppercase tracking-wide">
          {item.name}
        </h3>
        {item.description && (
          <p className="font-body text-heat-white/70 text-sm leading-relaxed">
            {item.description}
          </p>
        )}
        <HeatRating level={item.heat_level} />
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="font-display text-3xl text-heat-red">
          {formatPrice(item.price)}
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleAdd}
          sizzle={item.heat_level >= 4}
        >
          {added ? "ADDED!" : "ADD"}
        </Button>
      </div>
    </Card>
  );
}
