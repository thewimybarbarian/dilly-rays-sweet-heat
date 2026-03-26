"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * A single flame-chili PNG that floats around the page.
 * When the cursor gets near it, it gets bumped away smoothly.
 * Multiple instances can be placed at different starting positions.
 */

interface FloatingChiliProps {
  /** Starting position as viewport percentages */
  startX?: number;
  startY?: number;
  /** Size in pixels */
  size?: number;
  /** How close the cursor needs to be to trigger a bump (px) */
  bumpRadius?: number;
  /** How hard the bump pushes (multiplier) */
  bumpStrength?: number;
  /** Z-index layer */
  z?: number;
}

export default function FloatingChili({
  startX = 75,
  startY = 50,
  size = 120,
  bumpRadius = 150,
  bumpStrength = 120,
  z = 2,
}: FloatingChiliProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Spring-driven position for smooth cursor bumps
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, { stiffness: 30, damping: 12, mass: 1.5 });
  const springY = useSpring(offsetY, { stiffness: 30, damping: 12, mass: 1.5 });

  // Rotation reacts to horizontal movement for a natural tumble
  const rotation = useTransform(springX, [-200, 200], [-25, 25]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = centerX - e.clientX;
      const dy = centerY - e.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < bumpRadius && distance > 0) {
        // Closer = stronger push, using inverse square for smooth falloff
        const force = (1 - distance / bumpRadius) * bumpStrength;
        const angle = Math.atan2(dy, dx);

        // Push AWAY from cursor
        offsetX.set(offsetX.get() + Math.cos(angle) * force * 0.3);
        offsetY.set(offsetY.get() + Math.sin(angle) * force * 0.3);
      }

      // Slowly drift back toward origin
      offsetX.set(offsetX.get() * 0.995);
      offsetY.set(offsetY.get() * 0.995);
    },
    [bumpRadius, bumpStrength, offsetX, offsetY],
  );

  // Drift-back timer — gradually pull back to origin when not being bumped
  useEffect(() => {
    const interval = setInterval(() => {
      const x = offsetX.get();
      const y = offsetY.get();
      if (Math.abs(x) > 1 || Math.abs(y) > 1) {
        offsetX.set(x * 0.98);
        offsetY.set(y * 0.98);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [offsetX, offsetY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed pointer-events-none"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        x: springX,
        y: springY,
        rotate: rotation,
        zIndex: z,
        width: size,
        height: size,
      }}
    >
      {/* Ambient floating bob — layered under the spring position */}
      <motion.div
        animate={{
          y: [0, -14, 0, 10, 0],
          x: [0, 5, 0, -5, 0],
          rotate: [0, 4, 0, -4, 0],
          scale: [1, 1.03, 1, 0.97, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/flame-chill.png"
          alt="Flaming chili pepper"
          width={size}
          height={size}
          className="drop-shadow-[0_0_20px_rgba(234,88,12,0.4)] select-none"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}
