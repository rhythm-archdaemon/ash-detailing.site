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
   Each value is "phone  tablet(sm)  desktop(lg)".
   Always write the full class names. "text-" + a variable won't work.
   ───────────────────────────────────────────────────────────── */
const DEFAULT_TEXT = "text-lg";

const TEXT = {
  brand: "text-base sm:text-xl lg:text-2xl",           // "Ash Detailing Services" in the header
  link: DEFAULT_TEXT,                                  // desktop nav links
  mobileLink: "text-lg",                               // links inside the mobile menu
  sheetTitle: DEFAULT_TEXT,                            // title at the top of the mobile menu
  button: "text-sm sm:text-base lg:text-lg font-bold uppercase", // header "Book Now"
  mobileButton: "text-base font-bold uppercase",       // "Book Now" inside the mobile menu
  badge: "text-base",
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
      <div className="mx-auto flex h-16 items-center justify-between gap-2 px-3 sm:h-20 sm:gap-4 sm:px-6 lg:px-8">
        {/* Logo and brand */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 transition-opacity hover:opacity-90 sm:gap-3"
        >
          <Image
            src={logo}
            alt="Ash Detailing Services logo"
            width={80}
            height={80}
            className="h-11 w-11 shrink-0 object-contain sm:h-14 sm:w-14 lg:h-20 lg:w-20"
            priority
          />
          <span
            className={`${TEXT.brand} min-w-0 font-bold leading-tight tracking-tight text-foreground`}
          >
            Ash Detailing Services
          </span>
        </Link>

        <div className="hidden lg:block">
  <NavLinks />
</div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
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
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="h-6 w-6 text-foreground" />
            </SheetTrigger>

            <SheetContent side="right" className="w-[85vw] max-w-sm">
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

              <div className="mt-4 flex flex-col px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`border-b border-border/60 py-3 ${TEXT.mobileLink} font-medium text-muted-foreground transition-colors hover:text-foreground`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-6">
                  <Button
                    size="lg"
                    nativeButton={false}
                    render={<Link href="/booking" onClick={() => setOpen(false)} />}
                    className={`w-full ${TEXT.mobileButton}`}
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