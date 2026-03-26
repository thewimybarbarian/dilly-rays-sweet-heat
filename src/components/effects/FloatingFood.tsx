"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

/**
 * Each food item: an SVG icon with a thick black stroke,
 * absolutely positioned and animated in with scale + rotate,
 * then gently floating/bobbing continuously.
 */

interface FoodShape {
  id: string;
  left: string;
  top: string;
  size: number;
  rotate: number;
  delay: number;
  floatDuration: number;
  floatDistance: number;
  svg: React.ReactNode;
}

/* ── SVG Food Icons ──────────────────────────── */

function ChiliPepper({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path
        d="M50 15c-2 0-4 2-3 5 1 2 3 2 4 0 1-3-1-5-1-5z"
        fill="#16A34A"
        stroke="#0A0A0A"
        strokeWidth="3"
      />
      <path
        d="M50 22c-12 0-22 10-28 22-6 15-6 30-2 40 3 8 9 12 16 14 7 3 14 2 19-2 8-6 14-20 15-34 1-10 0-22-5-30-3-6-8-10-15-10z"
        fill="#DC2626"
        stroke="#0A0A0A"
        strokeWidth="3.5"
      />
      <path
        d="M35 45c-3 8-4 18-1 26 1 2 2 3 3 2 1-2 2-12 3-20 1-6 0-9-2-9s-2 0-3 1z"
        fill="#EF4444"
        opacity="0.5"
      />
    </svg>
  );
}

function Steak({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse
        cx="50"
        cy="52"
        rx="38"
        ry="28"
        fill="#92400E"
        stroke="#0A0A0A"
        strokeWidth="3.5"
      />
      <ellipse
        cx="50"
        cy="48"
        rx="38"
        ry="28"
        fill="#B45309"
        stroke="#0A0A0A"
        strokeWidth="3.5"
      />
      {/* Grill marks */}
      <line x1="25" y1="38" x2="75" y2="38" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      <line x1="22" y1="48" x2="78" y2="48" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      <line x1="25" y1="58" x2="75" y2="58" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      {/* Fat marbling */}
      <ellipse cx="40" cy="43" rx="6" ry="3" fill="#FDE68A" opacity="0.6" />
      <ellipse cx="58" cy="53" rx="5" ry="2" fill="#FDE68A" opacity="0.5" />
    </svg>
  );
}

function Drumstick({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Bone */}
      <path
        d="M68 70c3 3 8 10 10 16 2 5-1 8-5 6-4-2-6-5-8-4s-1 5 2 8c2 3-1 5-4 3-4-3-10-8-13-11z"
        fill="#FEF3C7"
        stroke="#0A0A0A"
        strokeWidth="3"
      />
      {/* Meat body */}
      <ellipse
        cx="42"
        cy="42"
        rx="28"
        ry="22"
        transform="rotate(-35 42 42)"
        fill="#B91C1C"
        stroke="#0A0A0A"
        strokeWidth="3.5"
      />
      {/* Glaze highlight */}
      <ellipse
        cx="38"
        cy="35"
        rx="12"
        ry="8"
        transform="rotate(-35 38 35)"
        fill="#DC2626"
        opacity="0.6"
      />
    </svg>
  );
}

function Flame({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path
        d="M50 5C50 5 20 35 20 60c0 16.6 13.4 30 30 30s30-13.4 30-30C80 35 50 5 50 5z"
        fill="#DC2626"
        stroke="#0A0A0A"
        strokeWidth="3.5"
      />
      <path
        d="M50 30c0 0-18 18-18 35c0 10 8 18 18 18s18-8 18-18C68 48 50 30 50 30z"
        fill="#EA580C"
        stroke="#0A0A0A"
        strokeWidth="2.5"
      />
      <path
        d="M50 50c0 0-10 10-10 20c0 5.5 4.5 10 10 10s10-4.5 10-10C60 60 50 50 50 50z"
        fill="#F59E0B"
      />
    </svg>
  );
}

function Ribs({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 80" fill="none">
      {/* Rack of ribs */}
      <path
        d="M10 15c20-5 80-5 100 0v50c-20 5-80 5-100 0z"
        fill="#92400E"
        stroke="#0A0A0A"
        strokeWidth="3.5"
      />
      {/* Rib bones */}
      <line x1="25" y1="18" x2="25" y2="62" stroke="#FEF3C7" strokeWidth="4" strokeLinecap="round" />
      <line x1="42" y1="15" x2="42" y2="65" stroke="#FEF3C7" strokeWidth="4" strokeLinecap="round" />
      <line x1="59" y1="14" x2="59" y2="66" stroke="#FEF3C7" strokeWidth="4" strokeLinecap="round" />
      <line x1="76" y1="15" x2="76" y2="65" stroke="#FEF3C7" strokeWidth="4" strokeLinecap="round" />
      <line x1="93" y1="18" x2="93" y2="62" stroke="#FEF3C7" strokeWidth="4" strokeLinecap="round" />
      {/* Glaze */}
      <path
        d="M15 25c18-3 75-3 90 0v10c-18 3-75 3-90 0z"
        fill="#B91C1C"
        opacity="0.4"
      />
    </svg>
  );
}

function SauceBottle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 100" fill="none">
      {/* Cap */}
      <rect x="20" y="5" width="20" height="12" rx="2" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="2" />
      {/* Neck */}
      <rect x="23" y="17" width="14" height="10" fill="#DC2626" stroke="#0A0A0A" strokeWidth="2.5" />
      {/* Body */}
      <path
        d="M15 27h30v55c0 5-4 10-10 10H25c-6 0-10-5-10-10z"
        fill="#DC2626"
        stroke="#0A0A0A"
        strokeWidth="3"
      />
      {/* Label */}
      <rect x="18" y="45" width="24" height="20" rx="2" fill="#FEF3C7" stroke="#0A0A0A" strokeWidth="2" />
      {/* Label text lines */}
      <line x1="22" y1="52" x2="38" y2="52" stroke="#0A0A0A" strokeWidth="2" />
      <line x1="24" y1="58" x2="36" y2="58" stroke="#B91C1C" strokeWidth="1.5" />
    </svg>
  );
}

function Corn({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 100" fill="none">
      {/* Husk */}
      <path d="M18 70c-8 2-14 8-12 15 2 4 8 4 12 2z" fill="#16A34A" stroke="#0A0A0A" strokeWidth="2.5" />
      <path d="M32 70c8 2 14 8 12 15-2 4-8 4-12 2z" fill="#22C55E" stroke="#0A0A0A" strokeWidth="2.5" />
      {/* Cob */}
      <ellipse cx="25" cy="40" rx="12" ry="32" fill="#F59E0B" stroke="#0A0A0A" strokeWidth="3" />
      {/* Kernels */}
      <ellipse cx="20" cy="25" rx="3" ry="4" fill="#EAB308" />
      <ellipse cx="30" cy="25" rx="3" ry="4" fill="#EAB308" />
      <ellipse cx="25" cy="33" rx="3" ry="4" fill="#EAB308" />
      <ellipse cx="20" cy="41" rx="3" ry="4" fill="#EAB308" />
      <ellipse cx="30" cy="41" rx="3" ry="4" fill="#EAB308" />
      <ellipse cx="25" cy="49" rx="3" ry="4" fill="#EAB308" />
      <ellipse cx="20" cy="55" rx="3" ry="4" fill="#EAB308" />
      <ellipse cx="30" cy="55" rx="3" ry="4" fill="#EAB308" />
    </svg>
  );
}

function SmokePuff({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 80" fill="none">
      <circle cx="35" cy="50" r="20" fill="#78716C" stroke="#0A0A0A" strokeWidth="3" opacity="0.7" />
      <circle cx="55" cy="40" r="22" fill="#A8A29E" stroke="#0A0A0A" strokeWidth="3" opacity="0.6" />
      <circle cx="45" cy="30" r="18" fill="#D6D3D1" stroke="#0A0A0A" strokeWidth="2.5" opacity="0.5" />
      <circle cx="65" cy="55" r="15" fill="#78716C" stroke="#0A0A0A" strokeWidth="2.5" opacity="0.5" />
    </svg>
  );
}

/* ── Shape Configuration ─────────────────────── */

const FOOD_SHAPES: FoodShape[] = [
  {
    id: "pepper-1",
    left: "8%",
    top: "18%",
    size: 70,
    rotate: 15,
    delay: 0.2,
    floatDuration: 6,
    floatDistance: 12,
    svg: <ChiliPepper size={70} />,
  },
  {
    id: "steak-1",
    left: "82%",
    top: "12%",
    size: 80,
    rotate: -10,
    delay: 0.4,
    floatDuration: 7,
    floatDistance: 10,
    svg: <Steak size={80} />,
  },
  {
    id: "flame-1",
    left: "72%",
    top: "55%",
    size: 55,
    rotate: 0,
    delay: 0.6,
    floatDuration: 5,
    floatDistance: 15,
    svg: <Flame size={55} />,
  },
  {
    id: "drumstick-1",
    left: "5%",
    top: "65%",
    size: 75,
    rotate: -25,
    delay: 0.3,
    floatDuration: 8,
    floatDistance: 8,
    svg: <Drumstick size={75} />,
  },
  {
    id: "ribs-1",
    left: "88%",
    top: "75%",
    size: 90,
    rotate: 12,
    delay: 0.8,
    floatDuration: 7,
    floatDistance: 10,
    svg: <Ribs size={90} />,
  },
  {
    id: "sauce-1",
    left: "18%",
    top: "80%",
    size: 55,
    rotate: -8,
    delay: 0.5,
    floatDuration: 6,
    floatDistance: 12,
    svg: <SauceBottle size={55} />,
  },
  {
    id: "pepper-2",
    left: "45%",
    top: "8%",
    size: 50,
    rotate: 35,
    delay: 0.7,
    floatDuration: 5.5,
    floatDistance: 14,
    svg: <ChiliPepper size={50} />,
  },
  {
    id: "corn-1",
    left: "92%",
    top: "40%",
    size: 60,
    rotate: 20,
    delay: 0.9,
    floatDuration: 6.5,
    floatDistance: 11,
    svg: <Corn size={60} />,
  },
  {
    id: "smoke-1",
    left: "35%",
    top: "70%",
    size: 70,
    rotate: 0,
    delay: 1.0,
    floatDuration: 9,
    floatDistance: 8,
    svg: <SmokePuff size={70} />,
  },
  {
    id: "flame-2",
    left: "3%",
    top: "40%",
    size: 45,
    rotate: -15,
    delay: 0.35,
    floatDuration: 5,
    floatDistance: 13,
    svg: <Flame size={45} />,
  },
];

/* ── Mobile-safe subset (4 items instead of 10) ── */
const MOBILE_IDS = new Set(["pepper-1", "flame-1", "steak-1", "drumstick-1"]);

/* ── Component ───────────────────────────────── */

export default function FloatingFood() {
  const isMobile = useIsMobile();
  const shapes = isMobile
    ? FOOD_SHAPES.filter((s) => MOBILE_IDS.has(s.id))
    : FOOD_SHAPES;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: shape.left,
            top: shape.top,
            width: isMobile ? shape.size * 0.7 : shape.size,
            height: isMobile ? shape.size * 0.7 : shape.size,
          }}
          initial={{
            opacity: 0,
            scale: 0,
            rotate: shape.rotate,
          }}
          animate={{
            opacity: isMobile ? [0, 0.1, 0.08] : [0, 0.15, 0.12],
            scale: 1,
            rotate: shape.rotate,
          }}
          transition={{
            delay: shape.delay,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          {isMobile ? (
            // Static on mobile — no continuous animation
            shape.svg
          ) : (
            <motion.div
              animate={{
                y: [0, -shape.floatDistance, 0, shape.floatDistance * 0.6, 0],
                rotate: [0, 3, 0, -3, 0],
              }}
              transition={{
                duration: shape.floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {shape.svg}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
