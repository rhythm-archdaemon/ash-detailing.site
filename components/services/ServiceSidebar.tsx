// components/services/service-sidebar.tsx  (desktop only)
"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/services";

type Props = {
  services: Service[];
  activeId: string;
  onSelect: (id: string) => void;
};

export default function ServiceSidebar({ services, activeId, onSelect }: Props) {
  return (
    <aside className="sticky top-28 self-start">
      <Card className="gap-0 py-0">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-base">Our services</CardTitle>
        </CardHeader>

        <CardContent className="p-2">
          <nav aria-label="Services" className="flex flex-col gap-1">
            {services.map((service) => {
              const active = service.id === activeId;
              return (
                <Button
                  key={service.id}
                  variant="ghost"
                  aria-current={active ? "true" : undefined}
                  onClick={() => onSelect(service.id)}
                  className={cn(
                    "h-auto w-full justify-between px-3 py-3 text-left text-base",
                    active && "bg-amber-500 text-black hover:bg-amber-400"
                  )}
                >
                  {service.title}
                  <ChevronRight className="h-4 w-4 shrink-0" />
                </Button>
              );
            })}
          </nav>
        </CardContent>
      </Card>
    </aside>
  );
}