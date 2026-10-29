// lib/booking.ts
export type Option = { id: string; label: string };

export type BookingOptions = {
  serviceTypes: Option[];
  addOns: Option[];
  vehicleTypes: Option[];
};

// Dates are "YYYY-MM-DD" strings, which is what a backend would send
export type Availability = {
  available: string[];
  pending: string[];
  booked: string[];
};

export type BookingRequest = {
  name: string;
  phone: string;
  serviceType: string;
  addOns: string[];
  vehicleType: string;
  date: string; // YYYY-MM-DD
  notes: string;
};

// Local-time helpers. They avoid new Date() with no arguments, so there's
// nothing "unstable" for Next.js to complain about while prerendering.
export const toDateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

export const fromDateKey = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

// ── Mock data: replace each function body with a fetch() later ──────────

const options: BookingOptions = {
  serviceTypes: [
    { id: "interior", label: "Interior Detail" },
    { id: "exterior", label: "Exterior Detail" },
    { id: "full", label: "Full Detailing" },
    { id: "not-sure", label: "Not sure" },
  ],
  addOns: [
    { id: "pet-hair", label: "Pet hair removal" },
    { id: "deep-shampoo", label: "Deep shampoo and steam" },
    { id: "engine-bay", label: "Engine bay clean" },
    { id: "clay-bar", label: "Clay bar treatment" },
    { id: "headlight", label: "Headlight restoration" },
    { id: "rain-repellent", label: "Window rain repellent" },
    { id: "baby-seat", label: "Baby seat clean and sanitize" },
  ],
  vehicleTypes: [
    { id: "car", label: "Car" },
    { id: "suv", label: "SUV" },
    { id: "truck", label: "Truck / Ute" },
    { id: "van", label: "Van" },
  ],
};

const availability: Availability = {
  available: [
    "2026-11-02", "2026-11-04", "2026-11-06", "2026-11-09", "2026-11-11",
    "2026-11-13", "2026-11-16", "2026-11-17", "2026-11-20", "2026-11-23",
    "2026-11-25", "2026-11-27", "2026-11-30", "2026-12-01", "2026-12-03",
    "2026-12-07", "2026-12-08", "2026-12-09",
  ],
  pending: ["2026-11-05", "2026-11-12", "2026-11-19", "2026-11-26", "2026-12-04"],
  booked: ["2026-11-03", "2026-11-10", "2026-11-18", "2026-11-24", "2026-12-02"],
};

export async function getBookingOptions(): Promise<BookingOptions> {
  return options;
}

export async function getAvailability(): Promise<Availability> {
  return availability;
}

// Stub: later this posts to your booking service (email + WhatsApp)
export async function submitBooking(
  request: BookingRequest
): Promise<{ ok: boolean }> {
  console.log("Booking request", request);
  return { ok: true };
}