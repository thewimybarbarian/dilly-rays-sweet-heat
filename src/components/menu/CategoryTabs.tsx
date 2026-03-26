"use client";

import type { MenuCategory } from "@/types";

type CategoryFilter = "all" | MenuCategory;

interface CategoryTabsProps {
  active: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
}

const TABS: { label: string; value: CategoryFilter }[] = [
  { label: "ALL", value: "all" },
  { label: "MAINS", value: "mains" },
  { label: "SIDES", value: "sides" },
  { label: "DRINKS", value: "drinks" },
  { label: "SAUCES", value: "sauces" },
];

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TABS.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`font-display uppercase tracking-widest text-lg px-6 py-3 transition-colors cursor-pointer ${
            active === tab.value
              ? "bg-heat-red text-heat-white"
              : "bg-heat-black text-heat-white border border-heat-red hover:bg-heat-red/20"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
