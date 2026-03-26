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
    <footer className="bg-heat-black border-t-4 border-heat-red">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h2 className="font-display text-2xl tracking-widest uppercase text-heat-white">
              Dilly Ray&apos;s Sweet Heat
            </h2>
            <p className="mt-2 font-body text-sm text-heat-white/60">
              Bold, smoky BBQ served from a double-decker bus. No shortcuts, no
              apologies.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-lg tracking-[0.2em] uppercase text-heat-red mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-heat-white/70 hover:text-heat-red transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display text-lg tracking-[0.2em] uppercase text-heat-red mb-4">
              Follow Us
            </h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-heat-white/70 hover:text-heat-red transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-heat-white/10 pt-6 text-center">
          <p className="font-body text-xs text-heat-white/40">
            &copy; 2026 Dilly Ray&apos;s Sweet Heat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
