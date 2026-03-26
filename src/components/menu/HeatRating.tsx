"use client";

interface HeatRatingProps {
  level: number;
}

export default function HeatRating({ level }: HeatRatingProps) {
  if (level <= 0) return null;

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 40 40"
            className={`transition-opacity ${i < level ? "opacity-100" : "opacity-15"}`}
          >
            <path
              d="M18 6c0-2 1-4 3-5 1.5 1.5 1 3 0 5z"
              fill={i < level ? "#16A34A" : "#555"}
            />
            <path
              d="M20 8c-4 0-7 3-9 7-2 5-2.5 10-1 14 1 3 3 5 5.5 6.5 2.5 1.5 5 1 7-.5 3-2.5 5-7 5.5-12 .5-4 0-8-1.5-11C24 9 22 8 20 8z"
              fill={i < level ? "#DC2626" : "#333"}
            />
          </svg>
        ))}
      </div>
      <span className="text-xs font-body font-bold text-heat-red tracking-wider">
        {level}/5
      </span>
    </div>
  );
}
