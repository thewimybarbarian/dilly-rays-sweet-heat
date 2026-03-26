"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

const FEATURED_ITEMS = [
  { id: "1", name: "Sweet Heat Wings", price: 1499, heat_level: 4, description: "Crispy wings tossed in our signature sweet heat glaze" },
  { id: "2", name: "Smoked Brisket Plate", price: 1799, heat_level: 2, description: "12-hour smoked brisket with two sides" },
  { id: "3", name: "The Bus Burger", price: 1499, heat_level: 3, description: "Double smash burger with pepper jack and jalape\u00f1os" },
  { id: "4", name: "Dilly Ray's Secret Sauce", price: 899, heat_level: 5, description: "Our legendary sauce \u2014 if you can handle it" },
];

function HeatRating({ level }: { level: number }) {
  return (
    <span className="text-lg" aria-label={`Heat level ${level} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < level ? "opacity-100" : "opacity-20"}>
          🌶️
        </span>
      ))}
    </span>
  );
}

export default function FeaturedMenu() {
  const router = useRouter();

  return (
    <section className="bg-heat-black py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-heat-white text-center tracking-wide">
          TASTE THE HEAT
          <span className="block mt-2 mx-auto w-24 h-1 bg-heat-red" />
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURED_ITEMS.map((item) => (
            <Card key={item.id} glow={item.heat_level >= 4}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display text-xl sm:text-2xl text-heat-white tracking-wide uppercase">
                  {item.name}
                </h3>
                <span className="font-display text-xl text-heat-red whitespace-nowrap ml-4">
                  {formatPrice(item.price)}
                </span>
              </div>
              <p className="text-heat-white/60 font-body mb-3">
                {item.description}
              </p>
              <HeatRating level={item.heat_level} />
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => router.push("/menu")}
          >
            SEE FULL MENU &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
}
