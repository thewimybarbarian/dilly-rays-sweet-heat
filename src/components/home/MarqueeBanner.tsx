"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const MARQUEE_ITEMS = [
  "SMOKED BRISKET",
  "SWEET HEAT WINGS",
  "CATERING",
  "PRIVATE EVENTS",
  "FIND THE BUS",
  "PULLED PORK",
  "DOUBLE-DECKER DINING",
  "BOOK US TODAY",
  "MAC & CHEESE",
  "CORPORATE EVENTS",
  "WEDDINGS",
  "FOOD FESTIVALS",
];

/* ── Inline fire SVG separator ── */
function FireIcon() {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 28"
      fill="none"
      className="inline-block mx-4 shrink-0 opacity-80"
      aria-hidden="true"
    >
      <path
        d="M10 0C10 0 3 8 3 16c0 5.5 3.1 10 7 10s7-4.5 7-10C17 8 10 0 10 0z"
        fill="#EA580C"
      />
      <path
        d="M10 8c0 0-4 5-4 10c0 3 1.8 5 4 5s4-2 4-5C14 13 10 8 10 8z"
        fill="#F59E0B"
        opacity="0.9"
      />
    </svg>
  );
}

function MarqueeContent() {
  return (
    <>
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span className="font-display text-sm sm:text-base md:text-lg tracking-[0.25em] uppercase text-heat-white whitespace-nowrap">
            {item}
          </span>
          <FireIcon />
        </span>
      ))}
    </>
  );
}

export default function MarqueeBanner() {
  return (
    <section className="relative bg-heat-red border-y-4 border-heat-black overflow-hidden">
      {/* Diagonal hash pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 12px)",
        }}
      />

      {/* CTA row with button */}
      <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-6 py-3 px-4 border-b-2 border-heat-black/20">
        <span className="font-display text-lg sm:text-xl md:text-2xl tracking-[0.2em] uppercase text-heat-white">
          HUNGRY?
        </span>
        <Link href="/menu">
          <Button
            variant="secondary"
            size="sm"
            sizzle
            className="!bg-heat-black !text-heat-white !border-heat-black hover:!bg-heat-white hover:!text-heat-black !shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)]"
          >
            ORDER NOW
          </Button>
        </Link>
        <motion.span
          className="hidden sm:inline font-display text-lg sm:text-xl md:text-2xl tracking-[0.2em] uppercase text-heat-white"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          🔥
        </motion.span>
      </div>

      {/* Scrolling marquee */}
      <div className="relative py-3 sm:py-4">
        <div className="marquee-track flex">
          {/* Two copies for seamless infinite scroll */}
          <div className="marquee-content flex items-center shrink-0">
            <MarqueeContent />
          </div>
          <div className="marquee-content flex items-center shrink-0" aria-hidden="true">
            <MarqueeContent />
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          width: max-content;
        }
        .marquee-content {
          animation: marquee-scroll 30s linear infinite;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-content {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
