// hero.tsx
import HeroImage from "./images/heroImage.jpg";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden">
      {/* Background image */}
      <Image
        src={HeroImage}
        alt="A freshly detailed car with a deep, glossy finish"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

      {/* Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            A showroom finish, at your front door.
          </h1>

          <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
            Hand wash and detailing for homes and workplaces across Newcastle
            and the Hunter. We bring all the equipment, you keep your day.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/booking" />}
              className="bg-amber-500 text-black hover:bg-amber-400"
            >
              Book a detail
            </Button>

            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/services" />}
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              See services and prices
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}