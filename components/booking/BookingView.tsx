// components/booking/booking-view.tsx
"use client";

import { useState } from "react";
import type { Availability, BookingOptions } from "@/lib/booking";
import BookingCalendar from "./BookingCalendar";
import BookingForm from "./BookingForm";

type Props = {
  options: BookingOptions;
  availability: Availability;
};

export default function BookingView({ options, availability }: Props) {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      {/* On phones the calendar comes first, since the form needs its date */}
      <div className="order-1 lg:sticky lg:top-28 lg:order-2">
        <BookingCalendar
          availability={availability}
          selected={date}
          onSelect={setDate}
        />
      </div>

      <div className="order-2 lg:order-1">
        <BookingForm options={options} date={date} onDateChange={setDate} />
      </div>
    </div>
  );
}