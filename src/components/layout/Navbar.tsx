"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useIsMobile } from "@/hooks/useIsMobile";
import CartDrawer from "@/components/cart/CartDrawer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/* ── Flame border — CSS-only on mobile, Framer Motion on desktop ── */
function FlameBorder({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <div
        className="pointer-events-none absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-t from-heat-red/60 via-heat-red/30 to-transparent"
        aria-hidden="true"
      />
    );
  }

  const flames = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 0.04,
    size: 12 + (i % 3) * 4,
    color: i % 3 === 0 ? "#DC2626" : i % 3 === 1 ? "#B91C1C" : "#991B1B",
  }));

  return (
    <div className="pointer-events-none absolute -bottom-1 left-0 right-0 flex justify-between items-end overflow-hidden px-2">
      {flames.map((f) => (
        <motion.svg
          key={f.id}
          width={f.size}
          height={f.size * 1.4}
          viewBox="0 0 20 28"
          fill="none"
          className="shrink-0"
          animate={{
            scaleY: [1, 1.3, 0.8, 1.2, 1],
            opacity: [0.7, 1, 0.5, 0.9, 0.7],
          }}
          transition={{
            repeat: Infinity,
            duration: 1 + f.id * 0.05,
            delay: f.delay,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "bottom center" }}
        >
          <path
            d="M10 0C10 0 3 8 3 16c0 5.5 3.1 10 7 10s7-4.5 7-10C17 8 10 0 10 0z"
            fill={f.color}
          />
          <path
            d="M10 8c0 0-4 5-4 10c0 3 1.8 5 4 5s4-2 4-5C14 13 10 8 10 8z"
            fill="#EA580C"
            opacity="0.8"
          />
        </motion.svg>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();
  const isMobile = useIsMobile();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-heat-black/95 backdrop-blur-sm border-b-4 border-heat-red">
        <FlameBorder isMobile={isMobile} />

        {/* Red glow under navbar */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
          style={{
            boxShadow:
              "0 4px 30px 8px rgba(185, 28, 28, 0.4), 0 2px 15px 4px rgba(234, 88, 12, 0.2)",
          }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 md:h-24 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              {isMobile ? (
                <Image
                  src="/images/logo.jpg"
                  alt="Dilly Ray's pig mascot"
                  width={44}
                  height={44}
                  className="rounded-full border-2 border-heat-red"
                />
              ) : (
                <motion.div
                  animate={{
                    y: [0, -5, 0, 4, 0],
                    rotate: [0, -3, 2, -2, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/images/logo.jpg"
                    alt="Dilly Ray's pig mascot"
                    width={56}
                    height={56}
                    className="rounded-full border-3 border-heat-red drop-shadow-[0_0_12px_rgba(185,28,28,0.5)]"
                  />
                </motion.div>
              )}
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl md:text-3xl tracking-[0.12em] text-heat-white uppercase leading-none group-hover:text-heat-red transition-colors">
                  Dilly Ray&apos;s
                </span>
                <span className="font-display text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] text-heat-red/70 uppercase leading-none mt-0.5">
                  Sweet Heat
                </span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative font-display text-lg tracking-[0.2em] uppercase text-heat-white/80 hover:text-heat-white transition-colors"
                >
                  {link.label}
                  <span className="absolute -bottom-2 left-0 h-[3px] w-0 bg-gradient-to-r from-heat-red via-heat-orange to-heat-ember transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4 md:gap-5">
              {/* Cart */}
              <button
                type="button"
                className="relative text-heat-white/80 hover:text-heat-red transition-colors"
                aria-label="Shopping cart"
                onClick={() => setCartOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-7 w-7 md:h-8 md:w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center bg-heat-red border-2 border-heat-black text-[10px] md:text-[11px] font-bold text-heat-white">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Hamburger */}
              <button
                type="button"
                className="md:hidden text-heat-white hover:text-heat-red transition-colors"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="square"
                    d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay — rendered OUTSIDE nav to escape its stacking context */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9998] flex flex-col items-center justify-center md:hidden"
            style={{ backgroundColor: "#B91C1C" }}
          >
            <button
              type="button"
              className="absolute top-5 right-5 text-heat-white hover:text-heat-black transition-colors p-2"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="h-9 w-9"
              >
                <path
                  strokeLinecap="square"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-4xl tracking-[0.2em] uppercase text-heat-white hover:text-heat-black transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
