"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

const FEATURED_ITEMS = [
  {
    id: "1",
    name: "Sweet Heat Wings",
    price: 1499,
    heat_level: 4,
    description: "Crispy wings tossed in our signature sweet heat glaze",
  },
  {
    id: "2",
    name: "Smoked Brisket Plate",
    price: 1799,
    heat_level: 2,
    description: "12-hour smoked brisket with two sides",
  },
  {
    id: "3",
    name: "The Bus Burger",
    price: 1499,
    heat_level: 3,
    description: "Double smash burger with pepper jack and jalape\u00f1os",
  },
  {
    id: "4",
    name: "Dilly Ray's Secret Sauce",
    price: 899,
    heat_level: 5,
    description: "Our legendary sauce \u2014 if you can handle it",
  },
];

function HeatPeppers({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Heat level ${level} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 40 40"
          className={`${i < level ? "opacity-100" : "opacity-15"} transition-opacity`}
        >
          <path
            d="M18 6c0-2 1-4 3-5 1.5 1.5 1 3 0 5z"
            fill={i < level ? "#16A34A" : "#666"}
          />
          <path
            d="M20 8c-4 0-7 3-9 7-2 5-2.5 10-1 14 1 3 3 5 5.5 6.5 2.5 1.5 5 1 7-.5 3-2.5 5-7 5.5-12 .5-4 0-8-1.5-11C24 9 22 8 20 8z"
            fill={i < level ? "#DC2626" : "#444"}
          />
        </svg>
      ))}
    </div>
  );
}

export default function FeaturedMenu() {
  const router = useRouter();

  return (
    <section className="bg-heat-black py-24 px-4 border-t-4 border-heat-red relative">
      <div className="max-w-5xl mx-auto">
        {/* Section heading with thick brutalist accent */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl sm:text-6xl md:text-7xl text-heat-white tracking-wide"
          >
            TASTE THE HEAT
          </motion.h2>
          <div className="mt-4 mx-auto flex items-center justify-center gap-3">
            <div className="h-1 w-16 bg-heat-red" />
            <div className="h-3 w-3 bg-heat-red rotate-45" />
            <div className="h-1 w-16 bg-heat-red" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURED_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card glow={item.heat_level >= 4} className="group/item relative overflow-hidden">
                {/* Hover reveal line — sweeps left to right */}
                <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-heat-red via-heat-orange to-heat-ember group-hover/item:w-full transition-all duration-500" />
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-xl sm:text-2xl text-heat-white tracking-wide uppercase transition-all duration-200 group-hover/item:text-heat-red group-hover/item:drop-shadow-[0_0_8px_rgba(185,28,28,0.5)]">
                    {item.name}
                  </h3>
                  <span className="font-display text-2xl text-heat-red whitespace-nowrap ml-4 transition-all duration-200 group-hover/item:text-heat-orange group-hover/item:scale-110 origin-right">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="text-heat-white/50 font-body text-xs leading-relaxed mb-4 transition-colors duration-200 group-hover/item:text-heat-white/70">
                  {item.description}
                </p>
                <HeatPeppers level={item.heat_level} />
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Button
            size="lg"
            variant="secondary"
            onClick={() => router.push("/menu")}
          >
            SEE FULL MENU &rarr;
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
