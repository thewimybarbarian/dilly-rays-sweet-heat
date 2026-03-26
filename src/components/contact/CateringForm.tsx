"use client";

import { useState, type FormEvent } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const EVENT_TYPES = ["Wedding", "Corporate", "Festival", "Private Party", "Other"] as const;

export function CateringForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setError(false);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="name"
          label="Name"
          type="text"
          required
          placeholder="Your name"
          className="border-heat-red"
        />
        <Input
          id="email"
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          className="border-heat-red"
        />
        <Input
          id="phone"
          label="Phone"
          type="tel"
          required
          placeholder="(615) 555-0000"
          className="border-heat-red"
        />
        <Input
          id="event-date"
          label="Event Date"
          type="date"
          required
          className="border-heat-red"
        />
        <div>
          <label
            htmlFor="event-type"
            className="block font-display uppercase tracking-widest text-sm text-heat-white mb-2"
          >
            Event Type
          </label>
          <select
            id="event-type"
            required
            className="w-full bg-heat-black text-heat-white border-4 border-heat-red px-4 py-3 font-body text-base focus:border-heat-red focus:outline-none focus:ring-2 focus:ring-heat-red/50 transition-colors"
          >
            <option value="">Select event type</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <Input
          id="guest-count"
          label="Estimated Guest Count"
          type="number"
          min={1}
          placeholder="50"
          className="border-heat-red"
        />
      </div>

      <Textarea
        id="message"
        label="Message"
        placeholder="Tell us about your event..."
        rows={5}
        className="border-heat-red"
      />

      <Button type="submit" variant="primary" size="lg" disabled={submitting}>
        {submitting ? "SENDING..." : "SEND INQUIRY"}
      </Button>

      {success && (
        <div className="border-4 border-heat-red bg-heat-red/10 p-4 font-display uppercase tracking-widest text-heat-white text-center">
          INQUIRY SENT! We&apos;ll get back to you within 24 hours.
        </div>
      )}

      {error && (
        <div className="border-4 border-heat-red bg-heat-red/20 p-4 font-display uppercase tracking-widest text-heat-red text-center">
          Something went wrong. Please try again.
        </div>
      )}
    </form>
  );
}
