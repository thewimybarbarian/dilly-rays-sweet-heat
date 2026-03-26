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
  primary:
    "bg-heat-red text-heat-white border-4 border-heat-red shadow-[4px_4px_0px_0px_#0A0A0A] hover:shadow-[8px_8px_0px_0px_#0A0A0A] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-heat-red-light active:shadow-none active:translate-x-1 active:translate-y-1",
  secondary:
    "bg-heat-black text-heat-red border-4 border-heat-red shadow-[4px_4px_0px_0px_#B91C1C] hover:shadow-[8px_8px_0px_0px_#B91C1C] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-heat-red hover:text-heat-white active:shadow-none active:translate-x-1 active:translate-y-1",
  ghost:
    "bg-transparent text-heat-white border-4 border-heat-white/50 hover:border-heat-red hover:text-heat-red hover:bg-heat-red/10 hover:shadow-[0_0_20px_rgba(185,28,28,0.3)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-2xl font-display tracking-wider",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      sizzle = false,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={
          sizzle
            ? { scale: 1.03, rotate: [-0.5, 0.5, -0.5, 0] }
            : undefined
        }
        whileTap={{ scale: 0.97 }}
        className={`font-display uppercase tracking-widest cursor-pointer transition-all duration-150 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);
Button.displayName = "Button";
