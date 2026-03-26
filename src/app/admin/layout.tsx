import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/admin/LogoutButton";
import Link from "next/link";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/menu", label: "Menu" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/locations", label: "Locations" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") ?? "";

  // Login page doesn't require auth — render without sidebar
  const isLoginPage =
    pathname === "/admin/login" || pathname.startsWith("/admin/login");

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Auth check for all other admin pages
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-heat-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-heat-black border-r-4 border-heat-charcoal flex flex-col shrink-0">
        <div className="px-4 py-6 border-b-4 border-heat-charcoal">
          <h2 className="font-display text-2xl text-heat-red tracking-widest">
            DILLY RAY&apos;S
          </h2>
          <p className="font-display text-sm text-heat-smoke tracking-widest">
            ADMIN PANEL
          </p>
        </div>

        <nav className="flex-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 font-display uppercase tracking-widest text-sm text-heat-white hover:text-heat-red hover:bg-heat-charcoal transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t-4 border-heat-charcoal">
          <Link
            href="/"
            className="block px-4 py-3 font-display uppercase tracking-widest text-sm text-heat-smoke hover:text-heat-white hover:bg-heat-charcoal transition-colors"
          >
            &larr; Back to Site
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
