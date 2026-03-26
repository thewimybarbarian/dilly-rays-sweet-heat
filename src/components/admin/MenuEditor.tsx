"use client";

import { useState } from "react";
import type { MenuItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import MenuItemForm from "./MenuItemForm";

const MOCK_MENU_ITEMS: MenuItem[] = [
  { id: "1", name: "Pulled Pork Sandwich", description: "Slow-smoked pulled pork with tangy slaw on a brioche bun", price: 1299, category: "mains", image_url: null, heat_level: 1, available: true, sort_order: 1, created_at: "" },
  { id: "2", name: "Smoked Brisket Plate", description: "12-hour smoked brisket with two sides of your choice", price: 1799, category: "mains", image_url: null, heat_level: 2, available: true, sort_order: 2, created_at: "" },
  { id: "3", name: "Sweet Heat Wings", description: "Crispy wings tossed in our signature sweet heat glaze", price: 1499, category: "mains", image_url: null, heat_level: 4, available: true, sort_order: 3, created_at: "" },
  { id: "4", name: "The Bus Burger", description: "Double smash burger with pepper jack and pickled jalapeños", price: 1499, category: "mains", image_url: null, heat_level: 3, available: true, sort_order: 4, created_at: "" },
  { id: "5", name: "Jalapeño Mac & Cheese", description: "Creamy mac loaded with roasted jalapeños and bacon bits", price: 699, category: "sides", image_url: null, heat_level: 2, available: true, sort_order: 5, created_at: "" },
  { id: "6", name: "Smoky Coleslaw", description: "Cool and crunchy with a smoky vinaigrette twist", price: 499, category: "sides", image_url: null, heat_level: 0, available: true, sort_order: 6, created_at: "" },
  { id: "7", name: "Cornbread Muffins", description: "Sweet honey cornbread baked fresh daily", price: 499, category: "sides", image_url: null, heat_level: 0, available: true, sort_order: 7, created_at: "" },
  { id: "8", name: "Sweet Tea", description: "Southern-style sweet tea, ice cold", price: 399, category: "drinks", image_url: null, heat_level: 0, available: true, sort_order: 8, created_at: "" },
  { id: "9", name: "Lemonade", description: "Fresh-squeezed with a hint of mint", price: 399, category: "drinks", image_url: null, heat_level: 0, available: true, sort_order: 9, created_at: "" },
  { id: "10", name: "Dilly Ray's Secret Sauce", description: "Our legendary sauce — if you dare. Take a bottle home.", price: 899, category: "sauces", image_url: null, heat_level: 5, available: true, sort_order: 10, created_at: "" },
];

function PepperDisplay({ level }: { level: number }) {
  if (level === 0) return <span className="text-heat-smoke">—</span>;
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: level }).map((_, i) => (
        <span key={i} className="text-sm">🌶️</span>
      ))}
    </span>
  );
}

interface MenuEditorProps {
  onCreate?: (data: Partial<MenuItem>) => void;
  showCreateForm?: boolean;
  onCancelCreate?: () => void;
}

export default function MenuEditor({ onCreate, showCreateForm, onCancelCreate }: MenuEditorProps) {
  const [items, setItems] = useState<MenuItem[]>(MOCK_MENU_ITEMS);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleToggleAvailable = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
  };

  const handleEditSubmit = (data: Partial<MenuItem>) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === data.id ? { ...item, ...data } : item
      )
    );
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setConfirmDelete(null);
  };

  const handleCreate = (data: Partial<MenuItem>) => {
    const newItem: MenuItem = {
      id: String(Date.now()),
      name: data.name ?? "",
      description: data.description ?? null,
      price: data.price ?? 0,
      category: data.category ?? "mains",
      image_url: null,
      heat_level: data.heat_level ?? 0,
      available: data.available ?? true,
      sort_order: data.sort_order ?? items.length + 1,
      created_at: new Date().toISOString(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleCreateSubmit = (data: Partial<MenuItem>) => {
    handleCreate(data);
    if (onCreate) onCreate(data);
  };

  return (
    <div>
      {showCreateForm && (
        <div className="mb-8">
          <MenuItemForm
            onSubmit={handleCreateSubmit}
            onCancel={() => onCancelCreate?.()}
          />
        </div>
      )}

      {editingItem && (
        <div className="mb-8">
          <MenuItemForm
            initialData={editingItem}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingItem(null)}
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-4 border-heat-red">
              <th className="font-display text-left text-sm text-heat-smoke tracking-widest uppercase px-4 py-3">Name</th>
              <th className="font-display text-left text-sm text-heat-smoke tracking-widest uppercase px-4 py-3">Price</th>
              <th className="font-display text-left text-sm text-heat-smoke tracking-widest uppercase px-4 py-3">Category</th>
              <th className="font-display text-left text-sm text-heat-smoke tracking-widest uppercase px-4 py-3">Heat</th>
              <th className="font-display text-center text-sm text-heat-smoke tracking-widest uppercase px-4 py-3">Available</th>
              <th className="font-display text-right text-sm text-heat-smoke tracking-widest uppercase px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b-2 border-heat-charcoal hover:bg-heat-charcoal/30 transition-colors"
              >
                <td className="px-4 py-3 font-body text-heat-white">{item.name}</td>
                <td className="px-4 py-3 font-body text-heat-white">{formatPrice(item.price)}</td>
                <td className="px-4 py-3">
                  <span className="font-display text-xs uppercase tracking-widest text-heat-smoke">
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <PepperDisplay level={item.heat_level} />
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleToggleAvailable(item.id)}
                    className={`w-12 h-6 rounded-none border-2 relative cursor-pointer transition-colors ${
                      item.available
                        ? "bg-heat-red border-heat-red"
                        : "bg-heat-charcoal border-heat-charcoal"
                    }`}
                    aria-label={`Toggle availability for ${item.name}`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-heat-white transition-all ${
                        item.available ? "right-0.5" : "left-0.5"
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex gap-2 justify-end">
                    {confirmDelete === item.id ? (
                      <>
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handleDelete(item.id)}
                        >
                          CONFIRM
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setConfirmDelete(null)}
                        >
                          CANCEL
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleEdit(item)}
                        >
                          EDIT
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setConfirmDelete(item.id)}
                        >
                          DELETE
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Expose the create handler via a ref-like pattern — the page component
// will manage "showForm" state and pass onCreate down.
MenuEditor.displayName = "MenuEditor";
