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
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`bg-heat-black border-4 border-heat-red p-6 shadow-[8px_8px_0px_0px_rgba(185,28,28,0.4)] ${
          glow ? "animate-[glow_2s_ease-in-out_infinite] shadow-heat-red/60" : ""
        } ${className}`}
        style={
          glow
            ? {
                animation: "glow 2s ease-in-out infinite",
              }
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
