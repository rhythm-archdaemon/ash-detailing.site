// trust.tsx (overlay version)
import { CalendarCheck, Droplets, MapPin, Truck } from "lucide-react";

const trustItems = [
  {
    icon: Droplets,
    title: "Hand washed",
    text: "Gentle on your paintwork",
  },
  {
    icon: Truck,
    title: "We come to you",
    text: "Fully equipped mobile service",
  },
  {
    icon: MapPin,
    title: "Newcastle & the Hunter",
    text: "Homes and workplaces",
  },
  {
    icon: CalendarCheck,
    title: "Easy online booking",
    text: "Pick a time that suits you",
  },
];

export default function Trust() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-24 border-t border-white/15 bg-black/40 backdrop-blur-md lg:h-20">
      <div className="container mx-auto grid h-full grid-cols-2 content-center gap-x-3 gap-y-2 px-4 lg:grid-cols-4">
        {trustItems.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/15 lg:h-10 lg:w-10">
              <Icon className="h-4 w-4 text-amber-400 lg:h-5 lg:w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold leading-tight text-white sm:text-sm">
                {title}
              </p>
              <p className="mt-0.5 hidden text-xs text-white/65 lg:block">
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}