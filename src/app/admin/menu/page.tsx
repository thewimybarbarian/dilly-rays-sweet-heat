"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import MenuEditor from "@/components/admin/MenuEditor";

export default function AdminMenuPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-4xl text-heat-white tracking-widest">
          MENU MANAGEMENT
        </h1>
        <Button
          variant="primary"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "CANCEL" : "ADD NEW ITEM"}
        </Button>
      </div>

      <MenuEditor
        showCreateForm={showForm}
        onCancelCreate={() => setShowForm(false)}
        onCreate={() => setShowForm(false)}
      />
    </div>
  );
}
