"use client";

interface HeatRatingProps {
  level: number;
}

export default function HeatRating({ level }: HeatRatingProps) {
  if (level <= 0) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < level ? "opacity-100" : "opacity-20 grayscale"}
          >
            🌶️
          </span>
        ))}
      </div>
      <span className="text-sm text-heat-red font-body">
        🔥 {level}/5
      </span>
    </div>
  );
}
