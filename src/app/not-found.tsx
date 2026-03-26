import Link from "next/link";
import PepperRain from "@/components/effects/PepperRain";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-heat-black px-4 text-center">
      {/* Subtle pepper rain in background */}
      <PepperRain density={1} speed={1.5} opacity={0.15} />

      <div className="relative z-10 flex flex-col items-center">
        {/* Mascot */}
        <div className="mb-6 text-8xl md:text-9xl select-none" aria-hidden="true">
          <span className="inline-block animate-bounce">🐷</span>
          <span className="inline-block animate-pulse">🌶️</span>
        </div>

        {/* 404 */}
        <h1 className="font-display text-[10rem] md:text-[14rem] leading-none text-heat-red tracking-wider">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-2 font-display text-3xl md:text-5xl uppercase tracking-wider text-heat-white">
          This Ain&apos;t on the Menu
        </h2>

        {/* Subtext */}
        <p className="mt-4 max-w-md text-lg text-heat-white/60">
          Looks like this page got smoked a little too long. Let&apos;s get you
          back to the good stuff.
        </p>

        {/* CTA */}
        <div className="mt-10">
          <Link href="/">
            <Button size="xl" sizzle>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
