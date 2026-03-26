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

export default function CategoryTabs({
  active,
  onChange,
}: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`
            font-display uppercase tracking-[0.2em] text-lg px-6 py-3
            border-4 transition-all duration-150 cursor-pointer
            ${
              active === tab.value
                ? "bg-heat-red text-heat-white border-heat-red shadow-[3px_3px_0px_0px_#0A0A0A]"
                : "bg-heat-black text-heat-white/60 border-heat-charcoal hover:border-heat-red hover:text-heat-white"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
