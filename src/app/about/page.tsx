import type { Metadata } from "next";
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
      <section className="relative overflow-hidden border-b-4 border-heat-red py-32 text-center">
        {/* CSS-only smoke texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
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
          <p className="mt-6 font-display text-2xl uppercase tracking-widest text-heat-red md:text-3xl">
            Where BBQ Meets the Open Road
          </p>
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
              <p className="text-lg leading-relaxed text-heat-white/90">
                Dilly Ray&apos;s Sweet Heat isn&apos;t your average food truck.
                We roll up in a fully converted double-decker bus that turns
                heads and fills stomachs.
              </p>
              <p className="text-lg leading-relaxed text-heat-white/90">
                The ground level is where the magic happens &mdash; our
                custom-built smoker and kitchen pump out plate after plate of
                slow-smoked perfection. Order at the window and grab a seat
                upstairs.
              </p>
              <p className="text-lg leading-relaxed text-heat-white/90">
                The top deck is the dining room with a view. Open-air seating
                lets you watch the world go by while you tear into a pulled pork
                sandwich dripping with our signature sweet heat sauce. There
                is nothing else like it on the road.
              </p>
              <div className="h-1 w-24 bg-heat-red" />
            </div>
            {/* Placeholder image */}
            <div className="flex min-h-[400px] items-center justify-center border-4 border-heat-charcoal bg-heat-charcoal">
              <span className="font-display text-xl uppercase tracking-widest text-heat-white/40">
                BUS PHOTO COMING SOON
              </span>
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
              <div className="mb-6 flex h-28 w-28 items-center justify-center border-4 border-heat-red bg-heat-charcoal">
                <span className="font-display text-3xl text-heat-red">JF</span>
              </div>
              <h3 className="font-display text-3xl uppercase tracking-wider text-heat-red">
                Jason Flick
              </h3>
              <p className="mt-1 font-display text-sm uppercase tracking-widest text-heat-white/60">
                Co-Founder
              </p>
              <p className="mt-4 leading-relaxed text-heat-white/80">
                Jason has been obsessed with smoking meats since he built his
                first backyard pit out of cinder blocks. A serial brand builder
                with a nose for oak smoke and an ear for what people actually
                want to eat, he handles the operations, the tech, and makes sure
                every brisket hits the right bark.
              </p>
            </Card>
            {/* Dylan */}
            <Card className="p-8">
              <div className="mb-6 flex h-28 w-28 items-center justify-center border-4 border-heat-red bg-heat-charcoal">
                <span className="font-display text-3xl text-heat-red">DJ</span>
              </div>
              <h3 className="font-display text-3xl uppercase tracking-wider text-heat-red">
                Dylan Johnson
              </h3>
              <p className="mt-1 font-display text-sm uppercase tracking-widest text-heat-white/60">
                Co-Founder
              </p>
              <p className="mt-4 leading-relaxed text-heat-white/80">
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
      <section className="border-b-4 border-heat-red py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-16 font-display text-5xl uppercase tracking-wider text-heat-red md:text-6xl">
            THE SWEET HEAT PHILOSOPHY
          </h2>
          <blockquote className="border-l-8 border-heat-red py-4 pl-8">
            <p className="font-display text-2xl uppercase leading-snug tracking-wide text-heat-white md:text-3xl">
              Quality ingredients. Low and slow over real wood. No shortcuts, no
              microwaves, no apologies.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-heat-white/80">
              Every cut is hand-selected. Every rub is mixed in-house. We smoke
              with post oak and cherry for hours &mdash; not minutes &mdash;
              until the meat tells us it&apos;s ready. Then we hit it with our
              signature sweet heat finish: a balance of brown sugar warmth,
              Carolina tang, and a slow-building pepper kick that stays with you.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-heat-white/80">
              That&apos;s the sweet heat philosophy. Respect the craft. Feed the
              people. Keep the fire burning.
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-28 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-6xl uppercase tracking-wider text-heat-white md:text-8xl">
            HUNGRY YET?
          </h2>
          <div className="mt-10">
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
