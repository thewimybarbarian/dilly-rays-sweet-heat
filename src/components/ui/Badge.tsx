export type BadgeVariant = "red" | "orange" | "yellow" | "gray";

export interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  red: "bg-heat-red text-heat-white border-heat-red-dark",
  orange: "bg-heat-orange text-heat-white border-heat-orange",
  yellow: "bg-heat-ember text-heat-black border-heat-ember",
  gray: "bg-heat-smoke text-heat-white border-heat-charcoal",
};

export function Badge({ variant = "red", className = "", children }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-display uppercase tracking-widest border-2 ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
