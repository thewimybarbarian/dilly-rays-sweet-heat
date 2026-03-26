import type { Metadata } from "next";
import { CateringForm } from "@/components/contact/CateringForm";
import { LocationSchedule } from "@/components/contact/LocationSchedule";

export const metadata: Metadata = {
  title: "Contact | Dilly Ray's Sweet Heat",
  description:
    "Find the bus, book us for your event, or just say hello. Dilly Ray's Sweet Heat BBQ.",
};

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com/dillyrayssweetheat" },
  { name: "Facebook", href: "https://facebook.com/dillyrayssweetheat" },
  { name: "TikTok", href: "https://tiktok.com/@dillyrayssweetheat" },
];

export default function ContactPage() {
  return (
    <main className="bg-heat-black text-heat-white">
      {/* Hero heading */}
      <section className="border-b-4 border-heat-red px-4 py-16 md:py-24 text-center">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase text-heat-white">
          Get In Touch
        </h1>
      </section>

      {/* Find the Bus */}
      <section className="border-b-4 border-heat-red px-4 py-12 md:py-16 max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl uppercase text-heat-red mb-8">
          Find the Bus
        </h2>
        <LocationSchedule />
      </section>

      {/* Catering form */}
      <section className="border-b-4 border-heat-red px-4 py-12 md:py-16 max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl uppercase text-heat-red mb-8">
          Book Us for Your Event
        </h2>
        <CateringForm />
      </section>

      {/* Social links */}
      <section className="px-4 py-12 md:py-16 text-center">
        <h2 className="font-display text-2xl md:text-3xl uppercase text-heat-white mb-6">
          Follow the Smoke
        </h2>
        <div className="flex justify-center gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display uppercase tracking-widest text-heat-red hover:text-heat-ember transition-colors border-b-2 border-heat-red pb-1"
            >
              {s.name}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
