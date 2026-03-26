import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Dilly Ray's Sweet Heat. Our story, our double-decker bus, and the Sweet Heat philosophy.",
};

export default function AboutPage() {
  return (
    <main>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden border-b-4 border-heat-red py-36 text-center">
        {/* Diagonal hash pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, #DC2626 10px, #DC2626 12px)",
          }}
        />
        {/* Noise texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <h1 className="font-display text-[clamp(4rem,12vw,10rem)] uppercase leading-[0.85] tracking-wider text-heat-white">
            THE STORY
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-[3px] w-12 bg-heat-red" />
            <p className="font-display text-xl uppercase tracking-[0.3em] text-heat-red md:text-2xl">
              Where BBQ Meets the Open Road
            </p>
            <div className="h-[3px] w-12 bg-heat-red" />
          </div>
        </div>
      </section>

      {/* ── The Bus Section ── */}
      <section className="border-b-4 border-heat-red py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-16 font-display text-5xl uppercase tracking-wider text-heat-white md:text-6xl">
            THE BUS
          </h2>
          <div className="grid gap-12 md:grid-cols-2">
            {/* Description */}
            <div className="space-y-6">
              <p className="font-body text-sm leading-relaxed text-heat-white/80">
                Dilly Ray&apos;s Sweet Heat isn&apos;t your average food truck.
                We roll up in a fully converted double-decker bus that turns
                heads and fills stomachs.
              </p>
              <p className="font-body text-sm leading-relaxed text-heat-white/80">
                The ground level is where the magic happens &mdash; our
                custom-built smoker and kitchen pump out plate after plate of
                slow-smoked perfection. Order at the window and grab a seat
                upstairs.
              </p>
              <p className="font-body text-sm leading-relaxed text-heat-white/80">
                The top deck is the dining room with a view. Open-air seating
                lets you watch the world go by while you tear into a pulled pork
                sandwich dripping with our signature sweet heat sauce. There is
                nothing else like it on the road.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="h-[3px] w-16 bg-heat-red" />
                <div className="h-3 w-3 bg-heat-red rotate-45" />
              </div>
            </div>
            {/* Bus photo */}
            <div className="relative min-h-[400px] border-4 border-heat-red overflow-hidden shadow-[8px_8px_0px_0px_rgba(185,28,28,0.5)]">
              <Image
                src="/images/bus.png"
                alt="Dilly Ray's Sweet Heat double-decker bus with pig mascot wrap"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── The Team Section ── */}
      <section className="border-b-4 border-heat-red py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-16 font-display text-5xl uppercase tracking-wider text-heat-white md:text-6xl">
            MEET THE PIT MASTERS
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            {/* Jason */}
            <Card className="p-8">
              <div className="mb-6 flex h-28 w-28 items-center justify-center border-4 border-heat-red bg-heat-charcoal shadow-[4px_4px_0px_0px_#B91C1C]">
                <span className="font-display text-4xl text-heat-red">JF</span>
              </div>
              <h3 className="font-display text-3xl uppercase tracking-wider text-heat-red">
                Jason Flick
              </h3>
              <p className="mt-1 font-body text-[10px] uppercase tracking-[0.3em] text-heat-white/40">
                Co-Founder
              </p>
              <p className="mt-4 font-body text-xs leading-relaxed text-heat-white/70">
                Jason has been obsessed with smoking meats since he built his
                first backyard pit out of cinder blocks. A serial brand builder
                with a nose for oak smoke and an ear for what people actually
                want to eat, he handles the operations, the tech, and makes sure
                every brisket hits the right bark.
              </p>
            </Card>
            {/* Dylan */}
            <Card className="p-8">
              <div className="mb-6 flex h-28 w-28 items-center justify-center border-4 border-heat-red bg-heat-charcoal shadow-[4px_4px_0px_0px_#B91C1C]">
                <span className="font-display text-4xl text-heat-red">DJ</span>
              </div>
              <h3 className="font-display text-3xl uppercase tracking-wider text-heat-red">
                Dylan Johnson
              </h3>
              <p className="mt-1 font-body text-[10px] uppercase tracking-[0.3em] text-heat-white/40">
                Co-Founder
              </p>
              <p className="mt-4 font-body text-xs leading-relaxed text-heat-white/70">
                Dylan is the creative fire behind Dilly Ray&apos;s. The man
                behind the sauce recipes, the bus concept, and the bold flavor
                combinations that keep people coming back. When he&apos;s not
                perfecting the sweet heat glaze, he&apos;s dreaming up the next
                move to put this bus on every corner.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Philosophy Section ── */}
      <section className="border-b-4 border-heat-red py-24 relative overflow-hidden">
        {/* Subtle red gradient bleed from left */}
        <div
          className="pointer-events-none absolute top-0 left-0 bottom-0 w-1/3 opacity-[0.03]"
          style={{
            background: "linear-gradient(to right, #DC2626, transparent)",
          }}
        />
        <div className="mx-auto max-w-4xl px-6 relative">
          <h2 className="mb-16 font-display text-5xl uppercase tracking-wider text-heat-red md:text-6xl">
            THE SWEET HEAT PHILOSOPHY
          </h2>
          <blockquote className="border-l-8 border-heat-red py-4 pl-8">
            <p className="font-display text-2xl uppercase leading-snug tracking-wide text-heat-white md:text-3xl">
              Quality ingredients. Low and slow over real wood. No shortcuts, no
              microwaves, no apologies.
            </p>
            <p className="mt-6 font-body text-sm leading-relaxed text-heat-white/70">
              Every cut is hand-selected. Every rub is mixed in-house. We smoke
              with post oak and cherry for hours &mdash; not minutes &mdash;
              until the meat tells us it&apos;s ready. Then we hit it with our
              signature sweet heat finish: a balance of brown sugar warmth,
              Carolina tang, and a slow-building pepper kick that stays with you.
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-heat-white/70">
              That&apos;s the sweet heat philosophy. Respect the craft. Feed the
              people. Keep the fire burning.
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── Scene Section ── */}
      <section className="border-b-4 border-heat-red relative overflow-hidden">
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src="/images/bus-scene.png"
            alt="Dilly Ray's Sweet Heat bus serving customers with outdoor dining"
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-heat-black/40" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 40%)",
            }}
          />
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-32 text-center relative">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-6xl uppercase tracking-wider text-heat-white md:text-8xl">
            HUNGRY YET?
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-1 w-16 bg-heat-red" />
            <div className="h-3 w-3 bg-heat-red rotate-45" />
            <div className="h-1 w-16 bg-heat-red" />
          </div>
          <div className="mt-12">
            <Link href="/menu">
              <Button size="xl" sizzle>
                CHECK THE MENU
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
