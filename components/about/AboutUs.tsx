// about.tsx
import AboutImage from "@/public/images/about-image.jpg";
import Image from "next/image";
import Link from "next/link";
import { Droplets, Home, ShieldCheck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Wallet,
    title: "Affordable",
    description: "Clear, upfront pricing with no hidden extras.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable",
    description: "We turn up on time and finish the job properly.",
  },
  {
    icon: Home,
    title: "At your doorstep",
    description: "We come to your home or workplace across the Hunter.",
  },
  {
    icon: Droplets,
    title: "Hand finished",
    description: "Gentle hand washing that protects your paintwork.",
  },
];

export default function About() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left: image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border lg:aspect-[4/3]">
          <Image
            src={AboutImage}
            alt="Our detailer hand washing a customer's car at their home"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Right: text + values */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
            About us
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Affordable. Reliable. At your doorstep.
          </h2>

          <div className="mt-5 space-y-4 text-muted-foreground">
            <p>
              Ash Mobile Hand Carwash & Detailing is a mobile service based in
              Newcastle, NSW. We bring the equipment, the products and the
              know-how straight to your home or workplace.
            </p>
            <p>
              Every vehicle is washed and detailed by hand, with the same care
              we'd give our own. No queues, no drop-offs, no wasted afternoon.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="gap-0 py-0">
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-amber-500/15">
                    <Icon className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/booking" />}
              className="bg-amber-500 text-black hover:bg-amber-400"
            >
              Book a Service
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}