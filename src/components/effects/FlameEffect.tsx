"use client";

import { motion } from "framer-motion";

interface FlameEffectProps {
  intensity?: "low" | "medium" | "high";
  children: React.ReactNode;
}

const glowSizes = {
  low: { spread: "8px", blur: "16px" },
  medium: { spread: "12px", blur: "24px" },
  high: { spread: "18px", blur: "36px" },
};

export default function FlameEffect({
  intensity = "medium",
  children,
}: FlameEffectProps) {
  const { spread, blur } = glowSizes[intensity];

  return (
    <motion.div
      className="inline-block"
      animate={{
        boxShadow: [
          `0 0 ${blur} ${spread} rgba(185, 28, 28, 0.4)`,
          `0 0 ${blur} ${spread} rgba(234, 88, 12, 0.5)`,
          `0 0 ${blur} ${spread} rgba(245, 158, 11, 0.4)`,
          `0 0 ${blur} ${spread} rgba(234, 88, 12, 0.5)`,
          `0 0 ${blur} ${spread} rgba(185, 28, 28, 0.4)`,
        ],
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
