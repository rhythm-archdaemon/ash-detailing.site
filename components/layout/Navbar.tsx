"use client";
import NavLinks from "./Navlinks";
import logo from "./images/logo.png";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

/* ─────────────────────────────────────────────────────────────
   TEXT SIZES: edit here, nowhere else
   Change DEFAULT_TEXT once to resize the whole navbar, or change
   a single line in TEXT to resize just that part.

   Tailwind sizes: text-base 16px · text-lg 18px · text-xl 20px
                   text-2xl 24px · text-3xl 30px · text-4xl 36px
   Always write the full class name. "text-" + a variable won't work.
   ───────────────────────────────────────────────────────────── */
const DEFAULT_TEXT = "text-lg";
const DEFAULT_BRAND_TEXT = "text-2xl"; // 24px

const TEXT = {
  brand: DEFAULT_BRAND_TEXT,                      // "Ash Detailing" in the header
  link: DEFAULT_TEXT,                            // desktop nav links
  mobileLink: DEFAULT_TEXT,                      // links inside the mobile menu
  sheetTitle: DEFAULT_TEXT,                      // title at the top of the mobile menu
  button: `${DEFAULT_TEXT} font-bold uppercase`, // both "Book Now" buttons
  badge: "text-base",                            // "Pro" badge, smaller on purpose
};

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Locations", href: "/#locations" },
  { name: "About", href: "/#about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-20 items-center justify-between px-4 sm:px-8">
        {/* Logo and brand */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <Image
            src={logo}
            alt="Ash Detailing Services logo"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
          <div className="flex items-center gap-2">
            <span className={`${TEXT.brand} font-bold tracking-tight text-foreground`}>
              Ash Detailing Services
            </span>
          </div>
        </Link>

        <NavLinks className="hidden lg:flex" />

        <div className="flex items-center gap-3">
          {/* Header button: hidden on phones, where it lives in the menu */}
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/booking" />}
            className={`hidden sm:inline-flex ${TEXT.button}`}
          >
            Book Now
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />}
            >
              <Menu className="h-6 w-6 text-foreground" />
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader className="border-b border-border pb-4 text-left">
                <SheetTitle className={`flex items-center gap-2 ${TEXT.sheetTitle}`}>
                  <Image
                    src={logo}
                    alt="Ash Detailing Services logo"
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                  <span>Ash Detailing Services</span>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`py-1 ${TEXT.mobileLink} font-medium text-muted-foreground transition-colors hover:text-foreground`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-2 border-t border-border pt-4">
                  <Button
                    size="lg"
                    nativeButton={false}
                    render={<Link href="/booking" onClick={() => setOpen(false)} />}
                    className={`w-full ${TEXT.button}`}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}