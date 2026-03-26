import Link from "next/link";

const statCards = [
  { label: "Orders Today", value: 0 },
  { label: "Pending Orders", value: 0 },
  { label: "Menu Items", value: 0 },
];

const quickLinks = [
  { href: "/admin/menu", label: "Manage Menu" },
  { href: "/admin/orders", label: "View Orders" },
  { href: "/admin/locations", label: "Manage Locations" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-display text-4xl text-heat-white tracking-widest mb-8">
        ADMIN DASHBOARD
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="border-4 border-heat-charcoal bg-heat-black p-6"
          >
            <p className="font-display text-sm text-heat-smoke tracking-widest uppercase mb-2">
              {card.label}
            </p>
            <p className="font-display text-5xl text-heat-red">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <h2 className="font-display text-2xl text-heat-white tracking-widest mb-4">
        QUICK LINKS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block border-4 border-heat-red bg-heat-black px-6 py-4 font-display uppercase tracking-widest text-heat-white text-center hover:bg-heat-red transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
