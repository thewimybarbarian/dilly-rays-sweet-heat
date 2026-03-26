"use client";

import { useState, type FormEvent } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { MenuItem, MenuCategory } from "@/types";

interface MenuItemFormProps {
  initialData?: MenuItem;
  onSubmit: (data: Partial<MenuItem>) => void;
  onCancel: () => void;
}

const CATEGORIES: { value: MenuCategory; label: string }[] = [
  { value: "mains", label: "Mains" },
  { value: "sides", label: "Sides" },
  { value: "drinks", label: "Drinks" },
  { value: "sauces", label: "Sauces" },
];

function PepperIndicator({ level }: { level: number }) {
  return (
    <span className="flex gap-1 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-lg ${i < level ? "opacity-100" : "opacity-20"}`}
        >
          🌶️
        </span>
      ))}
      <span className="ml-2 font-body text-sm text-heat-smoke">{level}/5</span>
    </span>
  );
}

export default function MenuItemForm({ initialData, onSubmit, onCancel }: MenuItemFormProps) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [priceDisplay, setPriceDisplay] = useState(
    initialData ? (initialData.price / 100).toFixed(2) : ""
  );
  const [category, setCategory] = useState<MenuCategory>(initialData?.category ?? "mains");
  const [heatLevel, setHeatLevel] = useState(initialData?.heat_level ?? 0);
  const [available, setAvailable] = useState(initialData?.available ?? true);
  const [sortOrder, setSortOrder] = useState(initialData?.sort_order ?? 0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const priceCents = Math.round(parseFloat(priceDisplay) * 100);
    onSubmit({
      ...(initialData ? { id: initialData.id } : {}),
      name,
      description: description || null,
      price: priceCents,
      category,
      heat_level: heatLevel,
      available,
      sort_order: sortOrder,
    });
  };

  const isValid = name.trim() !== "" && priceDisplay !== "" && !isNaN(parseFloat(priceDisplay));

  return (
    <form onSubmit={handleSubmit} className="border-4 border-heat-red bg-heat-black p-6 space-y-6">
      <h3 className="font-display text-2xl text-heat-white tracking-widest">
        {initialData ? "EDIT ITEM" : "NEW ITEM"}
      </h3>

      <Input
        id="name"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Item name"
      />

      <Textarea
        id="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Item description"
      />

      <Input
        id="price"
        label="Price ($)"
        type="number"
        step="0.01"
        min="0"
        value={priceDisplay}
        onChange={(e) => setPriceDisplay(e.target.value)}
        required
        placeholder="12.99"
      />

      <div>
        <label htmlFor="category" className="block font-display uppercase tracking-widest text-sm text-heat-white mb-2">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as MenuCategory)}
          className="w-full bg-heat-black text-heat-white border-4 border-heat-charcoal px-4 py-3 font-body text-base focus:border-heat-red focus:outline-none focus:ring-2 focus:ring-heat-red/50 transition-colors"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="heatLevel" className="block font-display uppercase tracking-widest text-sm text-heat-white mb-2">
          Heat Level
        </label>
        <input
          id="heatLevel"
          type="range"
          min={0}
          max={5}
          value={heatLevel}
          onChange={(e) => setHeatLevel(Number(e.target.value))}
          className="w-full accent-heat-red"
        />
        <PepperIndicator level={heatLevel} />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="available"
          type="checkbox"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
          className="w-5 h-5 accent-heat-red"
        />
        <label htmlFor="available" className="font-display uppercase tracking-widest text-sm text-heat-white">
          Available
        </label>
      </div>

      <Input
        id="sortOrder"
        label="Sort Order"
        type="number"
        min="0"
        value={sortOrder}
        onChange={(e) => setSortOrder(Number(e.target.value))}
      />

      <div className="flex gap-4">
        <Button type="submit" variant="primary" disabled={!isValid}>
          {initialData ? "UPDATE" : "CREATE"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          CANCEL
        </Button>
      </div>
    </form>
  );
}
