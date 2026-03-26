"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import LocationForm from "@/components/admin/LocationForm";
import type { Location } from "@/types/location";

const MOCK_LOCATIONS: Location[] = [
  { id: "1", name: "Nashville Farmers Market", address: "900 Rosa L Parks Blvd, Nashville, TN", date: "2026-04-01", start_time: "11:00", end_time: "15:00", notes: "Look for the red bus!" },
  { id: "2", name: "East Nashville Street Fest", address: "Shelby Ave, Nashville, TN", date: "2026-04-05", start_time: "12:00", end_time: "20:00", notes: "Main stage area" },
  { id: "3", name: "Centennial Park", address: "2500 West End Ave, Nashville, TN", date: "2026-04-12", start_time: "11:00", end_time: "16:00", notes: null },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function formatTime(t: string) {
  const [h, m] = t.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${display}:${m} ${ampm}`;
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>(MOCK_LOCATIONS);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];
  const upcoming = locations.filter((l) => l.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = locations.filter((l) => l.date < today).sort((a, b) => b.date.localeCompare(a.date));

  function handleAdd(data: Partial<Location>) {
    const newLoc: Location = {
      id: crypto.randomUUID(),
      name: data.name!,
      address: data.address!,
      date: data.date!,
      start_time: data.start_time!,
      end_time: data.end_time!,
      notes: data.notes ?? null,
    };
    setLocations((prev) => [...prev, newLoc]);
    setShowForm(false);
  }

  function handleEdit(data: Partial<Location>) {
    setLocations((prev) =>
      prev.map((l) => (l.id === data.id ? { ...l, ...data } as Location : l))
    );
    setEditingId(null);
  }

  function handleDelete(id: string) {
    setLocations((prev) => prev.filter((l) => l.id !== id));
  }

  const editingLocation = editingId ? locations.find((l) => l.id === editingId) : undefined;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-4xl text-heat-white tracking-widest">
          LOCATION MANAGEMENT
        </h1>
        {!showForm && !editingId && (
          <Button variant="primary" size="md" onClick={() => setShowForm(true)}>
            ADD LOCATION
          </Button>
        )}
      </div>

      {/* Add / Edit form */}
      {showForm && (
        <div className="mb-8">
          <LocationForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
        </div>
      )}
      {editingLocation && (
        <div className="mb-8">
          <LocationForm
            initialData={editingLocation}
            onSubmit={handleEdit}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}

      {/* Upcoming Locations */}
      <h2 className="font-display text-2xl text-heat-red tracking-widest mb-4">
        UPCOMING
      </h2>
      {upcoming.length === 0 ? (
        <p className="text-heat-smoke mb-8">No upcoming locations.</p>
      ) : (
        <div className="space-y-4 mb-10">
          {upcoming.map((loc) => (
            <LocationRow
              key={loc.id}
              location={loc}
              onEdit={() => { setEditingId(loc.id); setShowForm(false); }}
              onDelete={() => handleDelete(loc.id)}
            />
          ))}
        </div>
      )}

      {/* Past Locations */}
      <h2 className="font-display text-2xl text-heat-smoke tracking-widest mb-4">
        PAST
      </h2>
      {past.length === 0 ? (
        <p className="text-heat-smoke mb-8">No past locations.</p>
      ) : (
        <div className="space-y-4 opacity-60">
          {past.map((loc) => (
            <LocationRow
              key={loc.id}
              location={loc}
              onEdit={() => { setEditingId(loc.id); setShowForm(false); }}
              onDelete={() => handleDelete(loc.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function LocationRow({
  location,
  onEdit,
  onDelete,
}: {
  location: Location;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="border-4 border-heat-charcoal bg-heat-black p-4 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1 min-w-0">
        <p className="font-display text-lg text-heat-white tracking-wider">{location.name}</p>
        <p className="text-heat-smoke text-sm">{location.address}</p>
        <p className="text-heat-red text-sm font-display tracking-wider mt-1">
          {formatDate(location.date)} &middot; {formatTime(location.start_time)} &ndash; {formatTime(location.end_time)}
        </p>
        {location.notes && (
          <p className="text-heat-smoke text-sm italic mt-1">{location.notes}</p>
        )}
      </div>
      <div className="flex gap-2 shrink-0">
        <Button variant="secondary" size="sm" onClick={onEdit}>
          EDIT
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          DELETE
        </Button>
      </div>
    </div>
  );
}
