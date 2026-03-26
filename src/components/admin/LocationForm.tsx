"use client";

import { useState, type FormEvent } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { Location } from "@/types/location";

interface LocationFormProps {
  initialData?: Location;
  onSubmit: (data: Partial<Location>) => void;
  onCancel: () => void;
}

export default function LocationForm({ initialData, onSubmit, onCancel }: LocationFormProps) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [address, setAddress] = useState(initialData?.address ?? "");
  const [date, setDate] = useState(initialData?.date ?? "");
  const [startTime, setStartTime] = useState(initialData?.start_time ?? "");
  const [endTime, setEndTime] = useState(initialData?.end_time ?? "");
  const [notes, setNotes] = useState(initialData?.notes ?? "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      ...(initialData?.id ? { id: initialData.id } : {}),
      name,
      address,
      date,
      start_time: startTime,
      end_time: endTime,
      notes: notes.trim() || null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 border-4 border-heat-charcoal bg-heat-black p-6">
      <h3 className="font-display text-2xl text-heat-white tracking-widest">
        {initialData ? "EDIT LOCATION" : "NEW LOCATION"}
      </h3>

      <Input
        id="loc-name"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Event or venue name"
        required
      />

      <Input
        id="loc-address"
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Full address"
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          id="loc-date"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Input
          id="loc-start"
          label="Start Time"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <Input
          id="loc-end"
          label="End Time"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>

      <Textarea
        id="loc-notes"
        label="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Optional notes..."
      />

      <div className="flex gap-4">
        <Button type="submit" variant="primary" size="md">
          {initialData ? "SAVE CHANGES" : "ADD LOCATION"}
        </Button>
        <Button type="button" variant="ghost" size="md" onClick={onCancel}>
          CANCEL
        </Button>
      </div>
    </form>
  );
}
