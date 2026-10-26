import HeroImage from "@/public/images/heroImage.jpg";
import InteriorImage from "@/public/images/interior-detail.jpg";
import EngineImage from "@/public/images/engine-detail.jpg";

// lib/services.ts  (replaces the earlier file)
export type Service = {
  id: string;
  title: string;
  tagline: string;
  overview: string;
  image: string; // local path inside /public
  imageAlt: string;
  description: string[]; // short bullets (used by the home page cards)
  included: string[]; // full list (used by the services page)
  duration: string;
  price: {
    car: number;
    suvTruck: number;
  };
};

// Mock data: copy, durations and prices are placeholders.
const services: Service[] = [
  {
    id: "interior-detail",
    title: "Interior Detail",
    tagline: "A deep clean for everything you touch and sit on.",
    overview:
      "We vacuum, wipe and condition every surface inside your vehicle so it looks, feels and smells fresh again.",
    image: InteriorImage.src,
    imageAlt: "A freshly cleaned car interior",
    description: [
      "Full vacuum and wipe down",
      "Seats and carpets shampooed",
      "Dashboard and trims conditioned",
    ],
    included: [
      "Full vacuum of seats, carpets and boot",
      "Seats and carpets shampooed",
      "Dashboard, console and door trims conditioned",
      "Interior windows and mirrors cleaned",
      "Door jambs wiped down",
      "Air vents dusted and cleaned",
    ],
    duration: "About 2 hours",
    price: { car: 140, suvTruck: 180 },
  },
  {
    id: "exterior-detail",
    title: "Exterior Detail",
    tagline: "Hand washed, hand dried and finished by hand.",
    overview:
      "A gentle hand wash that lifts road grime without harming your paintwork, finished so the car shines.",
    image: HeroImage.src,
    imageAlt: "A car being hand washed with foam",
    description: [
      "Foam pre-wash and hand wash",
      "Wheels, tyres and arches cleaned",
      "Hand dried and tyres dressed",
    ],
    included: [
      "Foam pre-wash and two-bucket hand wash",
      "Wheels, tyres and arches cleaned",
      "Bug and tar spot treatment",
      "Hand dry with microfibre towels",
      "Exterior windows and mirrors cleaned",
      "Tyre dressing for a clean finish",
    ],
    duration: "About 1 hour",
    price: { car: 90, suvTruck: 120 },
  },
  {
    id: "full-detail",
    title: "Full Detail Package",
    tagline: "Our complete inside-and-out treatment.",
    overview:
      "Everything in our interior and exterior details, plus paint decontamination and protection for a true showroom finish.",
    image: EngineImage.src,
    imageAlt: "A glossy car after a full detail",
    description: [
      "Complete interior and exterior detail",
      "Clay bar treatment and polish",
      "Wax or sealant protection",
    ],
    included: [
      "Everything in the Interior Detail",
      "Everything in the Exterior Detail",
      "Clay bar treatment to remove bonded contaminants",
      "Hand polish for added gloss",
      "Wax or sealant protection",
    ],
    duration: "About 4 hours",
    price: { car: 280, suvTruck: 350 },
  },
];

// Mock "external source". Swap the body for a real fetch() later.
export async function getServices(): Promise<Service[]> {
  return services;
}