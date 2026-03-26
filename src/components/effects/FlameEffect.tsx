"use client";

import { motion } from "framer-motion";

interface FlameEffectProps {
  intensity?: "low" | "medium" | "high";
  children: React.ReactNode;
}

const glowConfig = {
  low: {
    shadows: [
      "0 0 10px rgba(185, 28, 28, 0.6), 0 0 20px rgba(185, 28, 28, 0.3)",
      "0 0 15px rgba(234, 88, 12, 0.5), 0 0 30px rgba(234, 88, 12, 0.2)",
      "0 0 10px rgba(185, 28, 28, 0.6), 0 0 20px rgba(185, 28, 28, 0.3)",
    ],
  },
  medium: {
    shadows: [
      "0 0 20px rgba(185, 28, 28, 0.7), 0 0 40px rgba(185, 28, 28, 0.3), 0 -5px 30px rgba(234, 88, 12, 0.2)",
      "0 0 25px rgba(234, 88, 12, 0.6), 0 0 50px rgba(234, 88, 12, 0.3), 0 -8px 40px rgba(245, 158, 11, 0.2)",
      "0 0 15px rgba(245, 158, 11, 0.5), 0 0 35px rgba(185, 28, 28, 0.4), 0 -5px 25px rgba(234, 88, 12, 0.15)",
      "0 0 20px rgba(185, 28, 28, 0.7), 0 0 40px rgba(185, 28, 28, 0.3), 0 -5px 30px rgba(234, 88, 12, 0.2)",
    ],
  },
  high: {
    shadows: [
      "0 0 30px rgba(185, 28, 28, 0.8), 0 0 60px rgba(185, 28, 28, 0.4), 0 -10px 50px rgba(234, 88, 12, 0.3), 0 0 100px rgba(185, 28, 28, 0.15)",
      "0 0 40px rgba(234, 88, 12, 0.7), 0 0 80px rgba(234, 88, 12, 0.35), 0 -15px 60px rgba(245, 158, 11, 0.3), 0 0 120px rgba(234, 88, 12, 0.1)",
      "0 0 25px rgba(245, 158, 11, 0.6), 0 0 50px rgba(185, 28, 28, 0.5), 0 -8px 45px rgba(234, 88, 12, 0.25), 0 0 90px rgba(245, 158, 11, 0.1)",
      "0 0 35px rgba(185, 28, 28, 0.75), 0 0 70px rgba(185, 28, 28, 0.4), 0 -12px 55px rgba(234, 88, 12, 0.3), 0 0 110px rgba(185, 28, 28, 0.12)",
      "0 0 30px rgba(185, 28, 28, 0.8), 0 0 60px rgba(185, 28, 28, 0.4), 0 -10px 50px rgba(234, 88, 12, 0.3), 0 0 100px rgba(185, 28, 28, 0.15)",
    ],
  },
};

export default function FlameEffect({
  intensity = "medium",
  children,
}: FlameEffectProps) {
  const config = glowConfig[intensity];

  return (
    <motion.div
      className="inline-block relative"
      animate={{
        textShadow: config.shadows,
        filter: [
          "brightness(1)",
          "brightness(1.05)",
          "brightness(0.98)",
          "brightness(1.03)",
          "brightness(1)",
        ],
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut",
      }}
    >
      {/* Bottom flame edge — subtle upward glow */}
      <motion.div
        className="pointer-events-none absolute -inset-x-4 -bottom-2 h-8"
        animate={{
          opacity: [0.15, 0.3, 0.1, 0.25, 0.15],
          scaleY: [1, 1.3, 0.9, 1.15, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(to top, rgba(234, 88, 12, 0.4), rgba(185, 28, 28, 0.1), transparent)",
          filter: "blur(12px)",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.div>
  );
}
