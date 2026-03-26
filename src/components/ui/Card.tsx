"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

export interface CardProps extends HTMLMotionProps<"div"> {
  glow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ glow = false, className = "", children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{
          y: -6,
          x: -3,
          boxShadow: "12px 12px 0px 0px rgba(185, 28, 28, 0.7)",
          transition: { type: "spring", stiffness: 400, damping: 15 },
        }}
        className={`
          bg-heat-black border-4 border-heat-red p-6
          shadow-[6px_6px_0px_0px_rgba(185,28,28,0.5)]
          transition-[border-color] duration-200
          hover:border-heat-red-light
          ${glow ? "" : ""}
          ${className}
        `}
        style={
          glow
            ? { animation: "glow 2s ease-in-out infinite" }
            : undefined
        }
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";
