"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-heat-black border-b-4 border-heat-red">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">&#x1F525;</span>
            <span className="font-display text-xl tracking-widest text-heat-white uppercase">
              Dilly Ray&apos;s
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative font-display text-sm tracking-[0.2em] uppercase text-heat-white hover:text-heat-red transition-colors"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-heat-red transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right side: cart + mobile hamburger */}
          <div className="flex items-center gap-4">
            {/* Cart icon */}
            <button
              type="button"
              className="relative text-heat-white hover:text-heat-red transition-colors"
              aria-label="Shopping cart"
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
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-heat-red text-[10px] font-bold text-heat-white">
                0
              </span>
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
                strokeWidth={2}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-heat-red flex flex-col items-center justify-center gap-8 md:hidden">
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
              strokeWidth={2}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-4xl tracking-[0.25em] uppercase text-heat-white hover:text-heat-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
