// footer.tsx
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const services = [
  "Interior Detail",
  "Exterior Detail",
  "Full Detail Package",
  "Pet Hair Removal",
];

const areas = [
  "Newcastle CBD",
  "Lake Macquarie",
  "Maitland",
  "Hunter Valley",
];

async function CopyrightYear() {
  return <>{new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="bg-[#233d4d] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={Logo}
                alt="Ash Mobile Hand Carwash & Detailing logo"
                width={44}
                height={44}
                className="rounded-md"
              />
              <span className="font-semibold leading-tight">
                Ash Mobile Hand
                <br />
                Carwash & Detailing
              </span>
            </Link>

            <p className="text-sm text-white/70">
              Affordable. Reliable. At Your Doorstep.
            </p>

            <Button
              nativeButton={false}
              render={<Link href="/booking" />}
              className="bg-amber-500 text-black hover:bg-amber-400"
            >
              Book a Service
            </Button>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber-500">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services + areas */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber-500">
                Services
              </h3>
              <ul className="space-y-2 text-sm text-white/70">
                {services.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact + areas */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber-500">
                Contact
              </h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  Newcastle, NSW
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <a href="tel:+610000000000" className="hover:text-white">
                    0000 000 000
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <a href="mailto:info@example.com" className="hover:text-white">
                    info@example.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber-500">
                Areas We Serve
              </h3>
              <ul className="space-y-2 text-sm text-white/70">
                {areas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-white/15" />

        <div className="flex flex-col items-center justify-between gap-3 text-sm text-white/60 sm:flex-row">
          <p>
            &copy; <CopyrightYear /> Ash Mobile Hand Carwash &amp; Detailing. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}