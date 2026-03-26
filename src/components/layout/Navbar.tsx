"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import CartDrawer from "@/components/cart/CartDrawer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/* ── Mini flame SVG for the bottom border fire effect ── */
function MiniFlame({
  delay,
  size,
  color,
}: {
  delay: number;
  size: number;
  color: string;
}) {
  return (
    <motion.svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 20 28"
      fill="none"
      className="shrink-0"
      animate={{
        scaleY: [1, 1.4, 0.8, 1.2, 1],
        scaleX: [1, 0.9, 1.1, 0.95, 1],
        opacity: [0.7, 1, 0.5, 0.9, 0.7],
      }}
      transition={{
        repeat: Infinity,
        duration: 0.8 + Math.random() * 0.6,
        delay,
        ease: "easeInOut",
      }}
      style={{ transformOrigin: "bottom center" }}
    >
      <path
        d="M10 0C10 0 3 8 3 16c0 5.5 3.1 10 7 10s7-4.5 7-10C17 8 10 0 10 0z"
        fill={color}
      />
      <path
        d="M10 8c0 0-4 5-4 10c0 3 1.8 5 4 5s4-2 4-5C14 13 10 8 10 8z"
        fill="#EA580C"
        opacity="0.8"
      />
      <path
        d="M10 14c0 0-2 2.5-2 5c0 1.4.9 2.5 2 2.5s2-1.1 2-2.5C12 16.5 10 14 10 14z"
        fill="#F59E0B"
        opacity="0.9"
      />
    </motion.svg>
  );
}

/* ── Flame border — a row of flickering flames along the bottom ── */
function FlameBorder() {
  const flames = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    size: 10 + Math.random() * 10,
    color: i % 3 === 0 ? "#DC2626" : i % 3 === 1 ? "#B91C1C" : "#991B1B",
  }));

  return (
    <div className="pointer-events-none absolute -bottom-1 left-0 right-0 flex justify-between items-end overflow-hidden px-2">
      {flames.map((f) => (
        <MiniFlame key={f.id} delay={f.delay} size={f.size} color={f.color} />
      ))}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-heat-black/95 backdrop-blur-sm border-b-4 border-heat-red">
      {/* Flame licks along the bottom border */}
      <FlameBorder />

      {/* Red glow under navbar */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{
          boxShadow:
            "0 4px 30px 8px rgba(185, 28, 28, 0.4), 0 2px 15px 4px rgba(234, 88, 12, 0.2)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          {/* Logo — bigger and floating */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              animate={{
                y: [0, -5, 0, 4, 0],
                rotate: [0, -3, 2, -2, 0],
                scale: [1, 1.03, 1, 0.98, 1],
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
            <div className="flex flex-col">
              <span className="font-display text-2xl md:text-3xl tracking-[0.12em] text-heat-white uppercase leading-none group-hover:text-heat-red transition-colors">
                Dilly Ray&apos;s
              </span>
              <span className="font-display text-[10px] md:text-xs tracking-[0.3em] text-heat-red/70 uppercase leading-none mt-0.5">
                Sweet Heat
              </span>
            </div>
          </Link>

          {/* Desktop nav links — bigger text */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative font-display text-lg tracking-[0.2em] uppercase text-heat-white/80 hover:text-heat-white transition-colors"
              >
                {link.label}
                {/* Flame underline on hover */}
                <span className="absolute -bottom-2 left-0 h-[3px] w-0 bg-gradient-to-r from-heat-red via-heat-orange to-heat-ember transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right side: cart + mobile hamburger */}
          <div className="flex items-center gap-5">
            {/* Cart icon — bigger */}
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
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {/* Badge */}
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center bg-heat-red border-2 border-heat-black text-[11px] font-bold text-heat-white"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* Hamburger — bigger */}
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
                className="h-9 w-9"
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

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-heat-red flex flex-col items-center justify-center gap-10 md:hidden"
          >
            <button
              type="button"
              className="absolute top-6 right-6 text-heat-white hover:text-heat-black transition-colors"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="h-10 w-10"
              >
                <path
                  strokeLinecap="square"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-6xl tracking-[0.25em] uppercase text-heat-white hover:text-heat-black transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}
