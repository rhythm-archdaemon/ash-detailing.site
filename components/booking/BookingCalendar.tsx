// components/booking/booking-calendar.tsx
"use client";

import { useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fromDateKey, toDateKey, type Availability } from "@/lib/booking";

type Props = {
  availability: Availability;
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
};

const legend = [
  { label: "Available", dot: "bg-emerald-500" },
  { label: "Pending", dot: "bg-amber-500" },
  { label: "Booked", dot: "bg-red-500" },
];

export default function BookingCalendar({ availability, selected, onSelect }: Props) {
  const { availableSet, modifiers, defaultMonth } = useMemo(() => {
    const toDates = (keys: string[]) => keys.map(fromDateKey);
    const sorted = [...availability.available].sort();
    return {
      availableSet: new Set(availability.available),
      defaultMonth: sorted.length ? fromDateKey(sorted[0]) : undefined,
      modifiers: {
        available: toDates(availability.available),
        pending: toDates(availability.pending),
        booked: toDates(availability.booked),
      },
    };
  }, [availability]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Choose a date</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onSelect}
            defaultMonth={defaultMonth}
            // Only dates the backend marks "available" can be picked
            disabled={(date) => !availableSet.has(toDateKey(date))}
            modifiers={modifiers}
            modifiersClassNames={{
              available:
                "rounded-md bg-emerald-500/10 [&>button]:font-semibold [&>button]:text-emerald-700 dark:[&>button]:text-emerald-400",
              pending:
                "rounded-md bg-amber-500/15 [&>button]:!opacity-100 [&>button]:text-amber-700 dark:[&>button]:text-amber-400",
              booked:
                "rounded-md bg-red-500/10 [&>button]:!opacity-100 [&>button]:text-red-700 [&>button]:line-through dark:[&>button]:text-red-400",
            }}
            className="[--cell-size:--spacing(10)] sm:[--cell-size:--spacing(12)]"
          />
        </div>

        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 border-t pt-4 text-sm">
          {legend.map(({ label, dot }) => (
            <li key={label} className="flex items-center gap-2 text-muted-foreground">
              <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
              {label}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}