// app/booking/page.tsx
import type { Metadata } from "next";
import BookingView from "@/components/booking/BookingView";
import { getAvailability, getBookingOptions } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Book a Service",
  description:
    "Book a mobile hand car wash or detail in Newcastle and the Hunter. Pick a date and tell us about your vehicle.",
};

export default async function BookingPage() {
  const [options, availability] = await Promise.all([
    getBookingOptions(),
    getAvailability(),
  ]);

  return (
    <main>
      <section className="bg-[#233d4d] text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
            Booking
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Book a Service
          </h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Pick an available date, tell us about your vehicle, and we&apos;ll
            confirm your booking.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 lg:py-16">
        <BookingView options={options} availability={availability} />
      </section>
    </main>
  );
}