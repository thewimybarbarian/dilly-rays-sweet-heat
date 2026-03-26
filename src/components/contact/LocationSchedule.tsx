import { Badge } from "@/components/ui/Badge";

const UPCOMING_LOCATIONS = [
  {
    id: "1",
    name: "Nashville Farmers Market",
    address: "900 Rosa L Parks Blvd, Nashville, TN",
    date: "2026-04-01",
    start_time: "11:00",
    end_time: "15:00",
    notes: "Look for the red bus!",
  },
  {
    id: "2",
    name: "East Nashville Street Fest",
    address: "Shelby Ave, Nashville, TN",
    date: "2026-04-05",
    start_time: "12:00",
    end_time: "20:00",
    notes: "Main stage area",
  },
  {
    id: "3",
    name: "Centennial Park",
    address: "2500 West End Ave, Nashville, TN",
    date: "2026-04-12",
    start_time: "11:00",
    end_time: "16:00",
    notes: null,
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = String(date.getDate()).padStart(2, "0");
  return { month, day };
}

function formatTime(time: string) {
  const [h, m] = time.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${display}:${m} ${ampm}`;
}

export function LocationSchedule() {
  return (
    <div className="space-y-0">
      {UPCOMING_LOCATIONS.map((loc, i) => {
        const { month, day } = formatDate(loc.date);
        return (
          <div
            key={loc.id}
            className={`flex gap-6 py-6 ${i < UPCOMING_LOCATIONS.length - 1 ? "border-b-4 border-heat-red" : ""}`}
          >
            {/* Date badge */}
            <div className="flex-shrink-0">
              <Badge variant="red" className="flex flex-col items-center px-4 py-2 text-center min-w-[70px]">
                <span className="text-xs leading-none">{month}</span>
                <span className="text-2xl font-bold leading-tight">{day}</span>
              </Badge>
            </div>

            {/* Content */}
            <div className="space-y-1">
              <h3 className="font-display text-xl md:text-2xl uppercase text-heat-white">
                {loc.name}
              </h3>
              <p className="font-body text-heat-smoke text-sm">{loc.address}</p>
              <p className="font-body text-heat-ember text-sm font-semibold">
                {formatTime(loc.start_time)} &ndash; {formatTime(loc.end_time)}
              </p>
              {loc.notes && (
                <p className="font-body text-heat-smoke text-sm italic">
                  {loc.notes}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
