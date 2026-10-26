// location-map.tsx
"use client";

import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import type { Location } from "@/lib/location";

export default function LocationMap({ locations }: { locations: Location[] }) {
  return (
    <MapContainer
      bounds={locations.map((l) => l.coords)}
      boundsOptions={{ padding: [40, 40] }}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((loc) => (
        <CircleMarker
          key={loc.id}
          center={loc.coords}
          radius={8}
          pathOptions={{
            color: "#ffffff",
            weight: 2,
            fillColor: "#f59e0b",
            fillOpacity: 1,
          }}
        >
          <Tooltip permanent direction={loc.labelDirection} offset={[0, 0]}>
            <span className="font-medium">{loc.name}</span>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}