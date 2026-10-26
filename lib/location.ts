// lib/locations.ts
export type Location = {
  id: string;
  name: string;
  description: string;
  coords: [lat: number, lng: number];
  // Which side of the pin the map label sits on (avoids overlaps)
  labelDirection: "top" | "bottom" | "left" | "right";
};

// Mock data. Swap for a fetch() later, same as services.
export const locations: Location[] = [
  {
    id: "newcastle-cbd",
    name: "Newcastle CBD",
    description: "Inner city, harbour and foreshore",
    coords: [-32.9283, 151.7817],
    labelDirection: "right",
  },
  {
    id: "hamilton",
    name: "Hamilton",
    description: "Inner west of Newcastle",
    coords: [-32.9167, 151.75],
    labelDirection: "top",
  },
  {
    id: "charlestown",
    name: "Charlestown",
    description: "Western suburbs",
    coords: [-32.9633, 151.6933],
    labelDirection: "left",
  },
  {
    id: "lake-macquarie",
    name: "Lake Macquarie",
    description: "Lakeside suburbs",
    coords: [-33.08, 151.62],
    labelDirection: "bottom",
  },
  {
    id: "maitland",
    name: "Maitland",
    description: "Hunter River city and surrounds",
    coords: [-32.7316, 151.555],
    labelDirection: "top",
  },
  {
    id: "hunter-valley",
    name: "Hunter Valley",
    description: "Vineyards and nearby towns",
    coords: [-32.787, 151.29],
    labelDirection: "top",
  },
];