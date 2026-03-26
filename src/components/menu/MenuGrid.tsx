"use client";

import { useState } from "react";
import type { MenuItem, MenuCategory } from "@/types";
import CategoryTabs from "@/components/menu/CategoryTabs";
import MenuCard from "@/components/menu/MenuCard";

type CategoryFilter = "all" | MenuCategory;

interface MenuGridProps {
  items: MenuItem[];
}

export default function MenuGrid({ items }: MenuGridProps) {
  const [category, setCategory] = useState<CategoryFilter>("all");

  const filtered = category === "all"
    ? items
    : items.filter(item => item.category === category);

  return (
    <>
      <CategoryTabs active={category} onChange={setCategory} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filtered.map(item => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-heat-white/50 font-body mt-12 text-lg">
          No items in this category.
        </p>
      )}
    </>
  );
}
