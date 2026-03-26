export type MenuCategory = "mains" | "sides" | "drinks" | "sauces";

export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number; // cents
  category: MenuCategory;
  image_url: string | null;
  heat_level: number; // 0-5
  available: boolean;
  sort_order: number;
  created_at: string;
}
