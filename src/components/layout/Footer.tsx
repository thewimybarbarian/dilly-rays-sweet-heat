import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/contact#find", label: "Find the Bus" },
];

const socialLinks = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "Facebook" },
  { href: "#", label: "TikTok" },
];

export default function Footer() {
  return (
    <footer className="bg-heat-black border-t-4 border-heat-red relative">
      {/* Top glow */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{ boxShadow: "0 -2px 20px 4px rgba(185, 28, 28, 0.2)" }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h2 className="font-display text-3xl tracking-[0.1em] uppercase text-heat-white">
              Dilly Ray&apos;s
              <span className="text-heat-red"> Sweet Heat</span>
            </h2>
            <div className="mt-2 h-[3px] w-16 bg-heat-red" />
            <p className="mt-4 font-body text-xs leading-relaxed text-heat-white/40">
              Bold, smoky BBQ served from a double-decker bus.
              <br />
              No shortcuts, no apologies.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-lg tracking-[0.2em] uppercase text-heat-red mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-xs text-heat-white/50 hover:text-heat-red transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="h-px w-0 bg-heat-red transition-all group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display text-lg tracking-[0.2em] uppercase text-heat-red mb-5">
              Follow Us
            </h3>
            <ul className="space-y-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-xs text-heat-white/50 hover:text-heat-red transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="h-px w-0 bg-heat-red transition-all group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t-2 border-heat-charcoal pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-[10px] tracking-wider uppercase text-heat-white/25">
            &copy; 2026 Dilly Ray&apos;s Sweet Heat. All rights reserved.
          </p>
          <p className="font-body text-[10px] tracking-wider uppercase text-heat-white/25">
            Double-Decker Bus BBQ Experience
          </p>
        </div>
      </div>
    </footer>
  );
}
