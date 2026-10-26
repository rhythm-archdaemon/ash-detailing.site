// services.tsx (the section that renders every card)
import ServiceCard from "./ServiceCard";
import { getServices } from "@/lib/services";

export default async function Services() {
  const services = await getServices();

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Our Services
        </h2>
        <p className="mt-3 text-muted-foreground">
          Choose the detail that suits your vehicle. We bring everything to you.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}