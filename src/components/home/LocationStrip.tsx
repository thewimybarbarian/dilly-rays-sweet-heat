const UPCOMING_LOCATIONS = [
  { id: "1", name: "Nashville Farmers Market", date: "2026-04-01", start_time: "11:00", end_time: "15:00" },
  { id: "2", name: "East Nashville Street Fest", date: "2026-04-05", start_time: "12:00", end_time: "20:00" },
  { id: "3", name: "Centennial Park", date: "2026-04-12", start_time: "11:00", end_time: "16:00" },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = date.getDate();
  return { month, day };
}

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return m === 0 ? `${hour}${period}` : `${hour}:${m.toString().padStart(2, "0")}${period}`;
}

export default function LocationStrip() {
  return (
    <section className="bg-heat-red border-y-4 border-heat-black py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-4xl sm:text-5xl text-heat-black text-center tracking-wide mb-10">
          FIND THE BUS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UPCOMING_LOCATIONS.map((loc) => {
            const { month, day } = formatDate(loc.date);
            return (
              <div
                key={loc.id}
                className="bg-heat-black border-4 border-heat-black p-6 text-center"
              >
                <div className="font-display text-heat-red text-sm tracking-widest">
                  {month}
                </div>
                <div className="font-display text-heat-white text-5xl leading-none mt-1">
                  {day}
                </div>
                <h3 className="font-display text-heat-white text-lg tracking-wide uppercase mt-4">
                  {loc.name}
                </h3>
                <p className="font-body text-heat-white/60 mt-2">
                  {formatTime(loc.start_time)} &ndash; {formatTime(loc.end_time)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
