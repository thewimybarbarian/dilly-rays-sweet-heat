"use client";

export default function SmokeOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 animate-smoke-drift opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
      <style jsx>{`
        @keyframes smoke-drift {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-20px, -15px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        .animate-smoke-drift {
          animation: smoke-drift 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
