// components/services/services-view.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { Service } from "@/lib/services";
import ServiceDetail from "./ServiceDetail";
import ServiceSidebar from "./ServiceSidebar";
import ServiceTopBar from "./ServiceTopBar";

export default function ServicesView({ services }: { services: Service[] }) {
  const [activeId, setActiveId] = useState(services[0].id);
  const lockRef = useRef(false); // pauses scroll-spy during a click-scroll
  const active = services.find((s) => s.id === activeId) ?? services[0];

  // Small screens: highlight the pill for the section currently on screen
  useEffect(() => {
    const sections = services
      .map((s) => document.getElementById(`service-${s.id}`))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id.replace("service-", ""));
        }
      },
      { rootMargin: "-140px 0px -55% 0px" }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [services]);

  // Small screens: tapping a pill scrolls to that service
  function scrollToService(id: string) {
    setActiveId(id);
    lockRef.current = true;
    document
      .getElementById(`service-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      lockRef.current = false;
    }, 900);
  }

  return (
    <div>
      {/* Small screens: fixed top bar */}
      <ServiceTopBar
        services={services}
        activeId={activeId}
        onSelect={scrollToService}
      />

      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Small screens: every service in a scrolling list, no sidebar */}
        <div className="space-y-10 lg:hidden">
          {services.map((service) => (
            <section
              key={service.id}
              id={`service-${service.id}`}
              className="scroll-mt-32 sm:scroll-mt-36"
            >
              <ServiceDetail service={service} />
            </section>
          ))}
        </div>

        {/* Desktop: sidebar + one service at a time */}
        <div className="hidden lg:grid lg:grid-cols-[280px_1fr] lg:gap-10">
          <ServiceSidebar
            services={services}
            activeId={activeId}
            onSelect={setActiveId}
          />
          <div key={active.id} className="animate-in fade-in duration-300">
            <ServiceDetail service={active} />
          </div>
        </div>
      </div>
    </div>
  );
}