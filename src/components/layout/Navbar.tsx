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

function FireLogo() {
  return (
    <svg
      width="28"
      height="34"
      viewBox="0 0 28 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M14 0C14 0 4 10 4 20C4 26.627 8.373 32 14 32C19.627 32 24 26.627 24 20C24 14 20 10 18 8C18 12 16 16 14 16C14 16 16 10 14 0Z"
        fill="#DC2626"
      />
      <path
        d="M14 12C14 12 9 18 9 23C9 26.314 11.239 29 14 29C16.761 29 19 26.314 19 23C19 19 16 16 15 15C15 17.5 14.5 19 13.5 19C13.5 19 14 15 14 12Z"
        fill="#EA580C"
      />
      <path
        d="M14 20C14 20 12 22 12 24.5C12 26.433 12.895 28 14 28C15.105 28 16 26.433 16 24.5C16 22.5 15 21 14.5 20.5C14.5 22 14.2 23 14 23C14 23 14 21.5 14 20Z"
        fill="#F59E0B"
      />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-heat-black/95 backdrop-blur-sm border-b-4 border-heat-red">
      {/* Subtle red glow under navbar */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{
          boxShadow: "0 2px 20px 4px rgba(185, 28, 28, 0.3)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              animate={{ rotate: [0, -3, 3, -2, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Image
                src="/images/logo.jpg"
                alt="Dilly Ray's pig mascot"
                width={36}
                height={36}
                className="rounded-full border-2 border-heat-red"
              />
            </motion.div>
            <span className="font-display text-xl tracking-[0.15em] text-heat-white uppercase group-hover:text-heat-red transition-colors">
              Dilly Ray&apos;s
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative font-display text-sm tracking-[0.2em] uppercase text-heat-white/80 hover:text-heat-white transition-colors"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[3px] w-0 bg-heat-red transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right side: cart + mobile hamburger */}
          <div className="flex items-center gap-4">
            {/* Cart icon */}
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
                className="h-6 w-6"
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
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center bg-heat-red border-2 border-heat-black text-[10px] font-bold text-heat-white"
                >
                  {itemCount}
                </motion.span>
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
                className="h-7 w-7"
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
            className="fixed inset-0 z-50 bg-heat-red flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-heat-white hover:text-heat-black transition-colors"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="h-8 w-8"
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
                  className="font-display text-5xl tracking-[0.25em] uppercase text-heat-white hover:text-heat-black transition-colors"
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
