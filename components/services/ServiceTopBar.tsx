// components/services/service-top-bar.tsx  (below lg only)
"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/services";

type Props = {
  services: Service[];
  activeId: string;
  onSelect: (id: string) => void;
};

export default function ServiceTopBar({ services, activeId, onSelect }: Props) {
  const barRef = useRef<HTMLDivElement>(null);

  // Keep the active pill centred in the bar as the user scrolls the page
  useEffect(() => {
    const bar = barRef.current;
    const el = bar?.querySelector<HTMLElement>(`[data-id="${activeId}"]`);
    if (!bar || !el) return;
    bar.scrollTo({
      left: el.offsetLeft - bar.clientWidth / 2 + el.clientWidth / 2,
      behavior: "smooth",
    });
  }, [activeId]);

  return (
    <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur sm:top-20 lg:hidden">
      <div
        ref={barRef}
        className="relative flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((service) => {
          const active = service.id === activeId;
          return (
            <Button
              key={service.id}
              data-id={service.id}
              size="sm"
              variant="outline"
              onClick={() => onSelect(service.id)}
              className={cn(
                "shrink-0 whitespace-nowrap",
                active &&
                  "border-amber-500 bg-amber-500 text-black hover:bg-amber-400 hover:text-black"
              )}
            >
              {service.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
}