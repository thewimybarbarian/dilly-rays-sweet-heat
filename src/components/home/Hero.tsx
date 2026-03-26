"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PepperRain from "@/components/effects/PepperRain";
import SmokeOverlay from "@/components/effects/SmokeOverlay";
import FlameEffect from "@/components/effects/FlameEffect";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen bg-heat-black flex items-center justify-center overflow-hidden">
      {/* Bus photo background */}
      <Image
        src="/images/bus.png"
        alt="Dilly Ray's Sweet Heat double-decker bus"
        fill
        priority
        className="object-cover object-center opacity-25"
        sizes="100vw"
      />

      <PepperRain density={2} speed={1.5} wind={0.3} opacity={0.2} />
      <SmokeOverlay />

      {/* Diagonal red accent stripe */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 right-0 w-[200%] h-[120px] bg-heat-red/8"
          style={{ transform: "rotate(-3deg) translateY(-20px)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[200%] h-[120px] bg-heat-red/8"
          style={{ transform: "rotate(-3deg) translateY(20px)" }}
        />
      </div>

      {/* Heavy dark vignette to keep text readable over bus photo */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.85) 100%)",
        }}
      />

      {/* Bottom edge red glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-[3]"
        style={{
          background:
            "linear-gradient(to top, rgba(185, 28, 28, 0.15), transparent)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Pig mascot logo — floating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <motion.div
            animate={{
              y: [0, -10, 0, 8, 0],
              rotate: [0, -3, 2, -2, 0],
              scale: [1, 1.02, 1, 0.98, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/logo.jpg"
              alt="Dilly Ray's Sweet Heat pig mascot"
              width={180}
              height={180}
              priority
              className="drop-shadow-[0_0_30px_rgba(185,28,28,0.5)] rounded-full border-4 border-heat-red"
            />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <FlameEffect intensity="high">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] tracking-wide text-heat-white leading-[0.9] px-4 py-2">
              DILLY RAY&apos;S
              <br />
              <span className="text-heat-red">SWEET HEAT</span>
            </h1>
          </FlameEffect>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {/* Red divider bar */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-[3px] w-12 bg-heat-red" />
            <p className="font-body text-xs sm:text-sm tracking-[0.4em] uppercase text-heat-white/50">
              Double-Decker Bus BBQ
            </p>
            <div className="h-[3px] w-12 bg-heat-red" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 font-display text-2xl sm:text-3xl md:text-4xl tracking-[0.15em] text-heat-red"
        >
          BBQ SO GOOD IT BITES BACK
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-10"
        >
          <Button
            size="xl"
            sizzle
            onClick={() => router.push("/menu")}
          >
            ORDER NOW
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
