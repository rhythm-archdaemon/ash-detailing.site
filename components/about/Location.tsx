// locations.tsx
"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { locations } from "@/lib/location";

// Leaflet needs the browser, so it can't render on the server
const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-muted" />,
});

export default function Locations() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Left: location stack */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Where we work
          </h2>
          <p className="mt-3 text-muted-foreground">
            We come to you across Newcastle and the Hunter.
          </p>

          <ul className="mt-8 divide-y">
            {locations.map((loc) => (
              <li key={loc.id} className="flex items-start gap-3 py-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-amber-500" />
                <div>
                  <p className="font-semibold">{loc.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {loc.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: map */}
        <div className="relative isolate z-0 h-[360px] overflow-hidden rounded-xl border sm:h-[460px] lg:h-[520px]">
          <LocationMap locations={locations} />
        </div>
      </div>
    </section>
  );
}