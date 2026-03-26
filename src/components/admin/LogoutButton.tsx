"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-3 font-display uppercase tracking-widest text-sm text-heat-smoke hover:text-heat-red hover:bg-heat-charcoal transition-colors cursor-pointer"
    >
      Log Out
    </button>
  );
}
