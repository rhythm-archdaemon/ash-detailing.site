// app/services/page.tsx
import type { Metadata } from "next";
import ServicesView from "@/components/services/ServiceView";
import { getServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services | Ash Mobile Hand Carwash & Detailing",
  description:
    "Interior, exterior and full detailing, plus pet hair removal, brought to your door in Newcastle and the Hunter.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main>
      <section className="bg-[#233d4d] text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
            Services
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Our Services
          </h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Hand wash and detailing for homes and workplaces. Pick a service to
            see what&apos;s included and what it costs.
          </p>
        </div>
      </section>

      <ServicesView services={services} />
    </main>
  );
}