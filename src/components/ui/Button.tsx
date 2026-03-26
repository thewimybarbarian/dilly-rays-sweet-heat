"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  sizzle?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-heat-red text-heat-white border-4 border-heat-black hover:bg-heat-red-light",
  secondary: "bg-heat-black text-heat-red border-4 border-heat-red hover:bg-heat-charcoal",
  ghost: "bg-transparent text-heat-white border-4 border-heat-white hover:bg-heat-white/10",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-2xl font-display tracking-wider",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", sizzle = false, className = "", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={sizzle ? { scale: 1.05, rotate: [-1, 1, -1, 0] } : { scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={`font-display uppercase tracking-widest cursor-pointer transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
