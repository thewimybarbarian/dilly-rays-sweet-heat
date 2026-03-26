import type { Metadata } from "next";
import type { MenuItem } from "@/types";
import MenuGrid from "@/components/menu/MenuGrid";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse our full BBQ menu. Smoked brisket, pulled pork, sweet heat wings, and more.",
};

const MENU_ITEMS: MenuItem[] = [
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

export default function MenuPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="font-display text-6xl md:text-8xl text-heat-white text-center mb-12 uppercase tracking-wider">
        The Menu
      </h1>
      <MenuGrid items={MENU_ITEMS} />
    </section>
  );
}
