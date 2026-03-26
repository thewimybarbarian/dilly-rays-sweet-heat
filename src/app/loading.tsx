export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-heat-black px-4">
      {/* Animated chili pepper */}
      <div className="relative mb-8">
        <span
          className="inline-block text-7xl md:text-8xl animate-spin select-none"
          style={{ animationDuration: "2s" }}
          aria-hidden="true"
        >
          🌶️
        </span>
        {/* Fire glow effect */}
        <div className="absolute inset-0 rounded-full bg-heat-red/20 blur-2xl animate-pulse" />
      </div>

      {/* Text */}
      <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-heat-white animate-pulse">
        Cookin&apos; Up Something...
      </h2>

      {/* Subtle dots animation */}
      <div className="mt-6 flex gap-2">
        <div className="h-3 w-3 rounded-full bg-heat-red animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="h-3 w-3 rounded-full bg-heat-red animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="h-3 w-3 rounded-full bg-heat-red animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
