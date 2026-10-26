import HeroImage from "@/public/images/heroImage.jpg";
import InteriorImage from "@/public/images/interior-detail.jpg";
import EngineImage from "@/public/images/engine-detail.jpg";

// lib/services.ts
export type Service = {
  id: string;
  title: string;
  image: string; // local path inside /public
  imageAlt: string;
  description: string[]; // each item renders as a bullet
  price: {
    car: number;
    suvTruck: number;
  };
};

const services: Service[] = [
  {
    id: "express-wash",
    title: "Express Hand Wash",
    image: HeroImage.src,
    imageAlt: "A car being hand washed with foam",
    description: [
      "Exterior hand wash and dry",
      "Wheels and tyres cleaned",
      "Windows cleaned inside and out",
    ],
    price: { car: 60, suvTruck: 80 },
  },
  {
    id: "interior-detail",
    title: "Interior Detail",
    image: InteriorImage.src,
    imageAlt: "A freshly cleaned car interior",
    description: [
      "Full vacuum and wipe down",
      "Seats and carpets shampooed",
      "Dashboard and trims conditioned",
    ],
    price: { car: 140, suvTruck: 180 },
  },
  {
    id: "full-detail",
    title: "Full Detail",
    image: EngineImage.src,
    imageAlt: "A glossy car after a full detail",
    description: [
      "Complete interior and exterior detail",
      "Clay bar treatment and polish",
      "Wax or sealant protection",
    ],
    price: { car: 280, suvTruck: 350 },
  },
];

// Mock "external source". Swap the body for a real fetch() later,
// and the rest of the app won't need to change.
export async function getServices(): Promise<Service[]> {
  return services;
}