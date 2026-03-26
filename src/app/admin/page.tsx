import Link from "next/link";

const statCards = [
  { label: "Orders Today", value: 12 },
  { label: "Pending Orders", value: 3 },
  { label: "Menu Items", value: 10 },
];

const quickLinks = [
  { href: "/admin/orders", label: "View Orders" },
  { href: "/admin/menu", label: "Manage Menu" },
  { href: "/admin/locations", label: "Add Location" },
];

const nextLocation = {
  name: "Nashville Farmers Market",
  address: "900 Rosa L Parks Blvd, Nashville, TN",
  date: "2026-04-01",
  time: "11:00 AM – 3:00 PM",
};

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-display text-4xl text-heat-white tracking-widest mb-8">
        ADMIN DASHBOARD
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
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

      {/* Next Location card */}
      <div className="border-4 border-heat-red bg-heat-black p-6 mb-10">
        <p className="font-display text-sm text-heat-smoke tracking-widest uppercase mb-2">
          NEXT LOCATION
        </p>
        <p className="font-display text-2xl text-heat-white tracking-wider">
          {nextLocation.name}
        </p>
        <p className="text-heat-smoke text-sm mt-1">{nextLocation.address}</p>
        <p className="text-heat-red text-sm font-display tracking-wider mt-1">
          {new Date(nextLocation.date + "T00:00:00").toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}{" "}
          &middot; {nextLocation.time}
        </p>
      </div>

      {/* Quick actions */}
      <h2 className="font-display text-2xl text-heat-white tracking-widest mb-4">
        QUICK ACTIONS
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
