// service-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Service } from "../../lib/services";

const formatPrice = (n: number) => `$${n.toLocaleString()}`;

export default function ServiceCard({ service }: { service: Service }) {
  const { title, image, imageAlt, description, price } = service;

  return (
    <Card className="flex h-full flex-col overflow-hidden pt-0">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Title */}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>

      {/* Bullet list */}
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {description.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      {/* Price + CTA */}
      <CardFooter className="flex flex-col items-stretch gap-4 border-t pt-4">
        <div className="space-y-1 text-sm">
          <p>
            Cars from{" "}
            <span className="font-semibold">{formatPrice(price.car)}</span>
          </p>
          <p>
            SUVs / Trucks from{" "}
            <span className="font-semibold">{formatPrice(price.suvTruck)}</span>
          </p>
        </div>

        <Button
          size="lg"
          nativeButton={false}
          render={<Link href="/booking" />}
          className="bg-amber-500 text-black hover:bg-amber-400"
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}