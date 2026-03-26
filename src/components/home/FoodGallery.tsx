"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const GALLERY_ITEMS = [
  {
    src: "/images/food/food-7.jpg",
    alt: "Tomahawk steak with chimichurri and sea salt",
    caption: "TOMAHAWK",
    span: "tall", // tall item in grid
  },
  {
    src: "/images/food/food-5.jpg",
    alt: "Ribs smoking on the grill with sausages and pickles",
    caption: "LOW & SLOW",
    span: "wide", // wide item in grid
  },
  {
    src: "/images/food/food-6.jpg",
    alt: "Sliced ribs with perfect smoke ring",
    caption: "SMOKE RING",
    span: "normal",
  },
  {
    src: "/images/food/brisket-whole.jpg",
    alt: "Whole brisket on the grill with beautiful bark",
    caption: "THE BARK",
    span: "normal",
  },
  {
    src: "/images/food/food-1.jpg",
    alt: "Smoked pork shoulder with crispy bark in foil",
    caption: "PORK SHOULDER",
    span: "normal",
  },
  {
    src: "/images/food/food-3.jpg",
    alt: "Grilled fish with pineapple rings on the smoker",
    caption: "ISLAND HEAT",
    span: "normal",
  },
  {
    src: "/images/food/sliced-meat.jpg",
    alt: "Tray of hand-sliced smoked brisket",
    caption: "HAND SLICED",
    span: "wide",
  },
  {
    src: "/images/food/food-2.jpg",
    alt: "Chopped brisket tray ready to serve",
    caption: "CHOPPED",
    span: "normal",
  },
];

export default function FoodGallery() {
  return (
    <section className="bg-heat-black py-20 md:py-28 px-4 border-t-4 border-heat-red relative overflow-hidden">
      {/* Diagonal accent lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 20px, #B91C1C 20px, #B91C1C 22px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-heat-white tracking-wide">
            PROOF IS IN THE SMOKE
          </h2>
          <div className="mt-4 mx-auto flex items-center justify-center gap-3">
            <div className="h-1 w-16 bg-heat-red" />
            <div className="h-3 w-3 bg-heat-red rotate-45" />
            <div className="h-1 w-16 bg-heat-red" />
          </div>
          <p className="mt-4 font-body text-xs text-heat-white/40 tracking-widest uppercase">
            Real food. Real smoke. No shortcuts.
          </p>
        </motion.div>

        {/* ── Desktop: Masonry-style grid ── */}
        <div className="hidden md:grid grid-cols-3 gap-4 auto-rows-[200px]">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`
                group relative border-4 border-heat-red overflow-hidden cursor-pointer
                shadow-[4px_4px_0px_0px_rgba(185,28,28,0.5)]
                hover:shadow-[8px_8px_0px_0px_rgba(185,28,28,0.7)]
                hover:border-heat-orange transition-all duration-300
                ${item.span === "tall" ? "row-span-2" : ""}
                ${item.span === "wide" ? "col-span-2" : ""}
              `}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark gradient overlay — always visible subtly, stronger on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Caption — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-display text-2xl lg:text-3xl text-heat-white tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  {item.caption}
                </span>
                <div className="h-1 w-0 group-hover:w-full bg-heat-red transition-all duration-500 mt-1" />
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-heat-red border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* ── Mobile: Horizontal scroll carousel ── */}
        <div className="md:hidden -mx-4">
          <div
            className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {GALLERY_ITEMS.map((item, i) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative flex-shrink-0 w-[280px] h-[360px] border-4 border-heat-red overflow-hidden snap-center shadow-[4px_4px_0px_0px_rgba(185,28,28,0.5)]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="280px"
                  className="object-cover"
                />
                {/* Always-visible caption on mobile (no hover) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12">
                  <span className="font-display text-2xl text-heat-white tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    {item.caption}
                  </span>
                  <div className="h-1 w-12 bg-heat-red mt-1" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="flex justify-center mt-3 gap-1">
            <span className="font-body text-[10px] text-heat-white/30 tracking-widest uppercase">
              swipe for more →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
