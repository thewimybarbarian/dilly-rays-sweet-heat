"use client";


const MARQUEE_ITEMS = [
  "SMOKED BRISKET",
  "SWEET HEAT WINGS",
  "CATERING",
  "PRIVATE EVENTS",
  "FIND THE BUS",
  "PULLED PORK",
  "DOUBLE-DECKER DINING",
  "BOOK US TODAY",
  "MAC & CHEESE",
  "CORPORATE EVENTS",
  "WEDDINGS",
  "FOOD FESTIVALS",
];

/* ── Inline fire SVG separator ── */
function FireIcon() {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 28"
      fill="none"
      className="inline-block mx-4 shrink-0 opacity-80"
      aria-hidden="true"
    >
      <path
        d="M10 0C10 0 3 8 3 16c0 5.5 3.1 10 7 10s7-4.5 7-10C17 8 10 0 10 0z"
        fill="#EA580C"
      />
      <path
        d="M10 8c0 0-4 5-4 10c0 3 1.8 5 4 5s4-2 4-5C14 13 10 8 10 8z"
        fill="#F59E0B"
        opacity="0.9"
      />
    </svg>
  );
}

function MarqueeContent() {
  return (
    <>
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span className="font-display text-sm sm:text-base md:text-lg tracking-[0.25em] uppercase text-heat-white whitespace-nowrap">
            {item}
          </span>
          <FireIcon />
        </span>
      ))}
    </>
  );
}

export default function MarqueeBanner() {
  return (
    <section className="relative overflow-hidden py-6 sm:py-8">
      {/* Diagonal rotated strip — wider than viewport to cover corners */}
      <div
        className="relative bg-heat-red border-y-4 border-heat-black"
        style={{
          width: "120%",
          marginLeft: "-10%",
          transform: "rotate(-3deg)",
        }}
      >
        {/* Diagonal hash pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 12px)",
          }}
        />

        {/* Scrolling marquee */}
        <div className="relative py-3 sm:py-4">
          <div className="marquee-track flex">
            {/* Two copies for seamless infinite scroll */}
            <div className="marquee-content flex items-center shrink-0">
              <MarqueeContent />
            </div>
            <div className="marquee-content flex items-center shrink-0" aria-hidden="true">
              <MarqueeContent />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          width: max-content;
        }
        .marquee-content {
          animation: marquee-scroll 30s linear infinite;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-content {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
