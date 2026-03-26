"use client";

import { useRouter } from "next/navigation";
import PepperRain from "@/components/effects/PepperRain";
import SmokeOverlay from "@/components/effects/SmokeOverlay";
import FlameEffect from "@/components/effects/FlameEffect";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen bg-heat-black flex items-center justify-center overflow-hidden">
      <PepperRain density={2} speed={1.5} wind={0.3} opacity={0.2} />
      <SmokeOverlay />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <FlameEffect intensity="high">
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide text-heat-white leading-none px-4 py-2">
            DILLY RAY&apos;S SWEET HEAT
          </h1>
        </FlameEffect>

        <p className="mt-6 font-display text-2xl sm:text-3xl md:text-4xl tracking-widest text-heat-red">
          BBQ SO GOOD IT BITES BACK
        </p>

        <p className="mt-4 font-body text-lg md:text-xl text-heat-white/60">
          Double-Decker Bus BBQ Experience
        </p>

        <div className="mt-10">
          <Button
            size="xl"
            sizzle
            onClick={() => router.push("/menu")}
          >
            ORDER NOW
          </Button>
        </div>
      </div>
    </section>
  );
}
