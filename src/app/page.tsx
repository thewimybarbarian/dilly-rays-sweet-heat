export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-heat-black">
      <h1 className="font-display text-6xl tracking-wide text-heat-red md:text-8xl">
        DILLY RAY&apos;S SWEET HEAT
      </h1>
      <p className="mt-4 font-body text-lg text-heat-white">
        Bold BBQ. No Apologies.
      </p>
      <div className="mt-8 flex gap-4">
        <span className="inline-block animate-flame text-4xl">🔥</span>
        <span className="inline-block animate-flame text-4xl" style={{ animationDelay: "0.3s" }}>🔥</span>
        <span className="inline-block animate-flame text-4xl" style={{ animationDelay: "0.6s" }}>🔥</span>
      </div>
    </div>
  );
}
