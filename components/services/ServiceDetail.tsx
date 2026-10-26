// components/services/service-detail.tsx
import Image from "next/image";
import Link from "next/link";
import { Check, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Service } from "@/lib/services";

const formatPrice = (n: number) => `$${n.toLocaleString()}`;

export default function ServiceDetail({ service }: { service: Service }) {
  const { title, tagline, overview, image, imageAlt, included, duration, price } =
    service;

  return (
    <Card className="overflow-hidden pt-0">
      <div className="relative aspect-[16/9] w-full lg:aspect-[21/9]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl">{title}</CardTitle>
        <CardDescription className="text-base">{tagline}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-muted-foreground">{overview}</p>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-semibold">What&apos;s included</h3>
            <ul className="space-y-2">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 self-start rounded-md border bg-muted/40 p-4">
            <h3 className="font-semibold">Pricing</h3>
            <p className="text-sm">
              Cars from{" "}
              <span className="text-lg font-bold">{formatPrice(price.car)}</span>
            </p>
            <p className="text-sm">
              SUVs / Trucks from{" "}
              <span className="text-lg font-bold">
                {formatPrice(price.suvTruck)}
              </span>
            </p>
            <Badge variant="secondary" className="gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {duration}
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href="/booking" />}
          className="w-full bg-amber-500 text-black hover:bg-amber-400 sm:w-auto"
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}