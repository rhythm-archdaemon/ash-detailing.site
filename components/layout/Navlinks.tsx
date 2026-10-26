"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─────────────────────────────────────────────────────────────
   SETTINGS: edit here
   Tailwind sizes: text-lg 18px · text-xl 20px · text-2xl 24px
   ───────────────────────────────────────────────────────────── */
const TEXT_SIZE = "text-lg uppercase";     // link text size (24px)
const LINK_PADDING = "px-5 py-2"; // space around each word inside the pill

// Single source of truth for the links. The mobile menu can import this too.
export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Locations", href: "/#locations" },
  { name: "About", href: "/#about" },
];

function isActive(href: string, pathname: string) {
  if (href.includes("#")) return false; // section links never count as "current page"
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const previous = useRef<number | null>(null);

  const [hovered, setHovered] = useState<number | null>(null);
  const [box, setBox] = useState({ x: 0, w: 0 }); // where the gold highlight sits
  const [instant, setInstant] = useState(true);   // true = jump into place, then fade in
  const [tick, setTick] = useState(0);            // bumps when the pill is resized

  const active = navLinks.findIndex((l) => isActive(l.href, pathname));
  const target = hovered ?? (active >= 0 ? active : null); // hovered link, else the current page

  // Measure the target link and move the highlight to it.
  useLayoutEffect(() => {
    if (target === null) {
      previous.current = null;
      return;
    }
    const el = itemRefs.current[target];
    if (!el) return;
    setInstant(previous.current === null); // first appearance: no sliding in from somewhere else
    setBox({ x: el.offsetLeft, w: el.offsetWidth });
    previous.current = target;
  }, [target, tick]);

  // Re-measure if the pill changes size (window resize, font finishes loading).
  useEffect(() => {
    const node = navRef.current;
    if (!node) return;
    const ro = new ResizeObserver(() => setTick((t) => t + 1));
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const visible = target !== null && box.w > 0;

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      onMouseLeave={() => setHovered(null)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovered(null);
      }}
      className={`relative inline-flex items-center rounded-full border border-border bg-card/70 p-1 shadow-sm backdrop-blur ${className}`}
    >
      {/* The gold highlight that glides between links */}
      <span
        aria-hidden
        className={`pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-primary shadow-md shadow-primary/40 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          instant ? "transition-opacity duration-300" : "transition-[transform,width,opacity] duration-[450ms]"
        } ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ transform: `translateX(${box.x}px)`, width: box.w }}
      />

      {navLinks.map((link, i) => (
        <Link
          key={link.name}
          href={link.href}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          onMouseEnter={() => setHovered(i)}
          onFocus={() => setHovered(i)}
          aria-current={i === active ? "page" : undefined}
          className={`relative z-10 rounded-full ${LINK_PADDING} ${TEXT_SIZE} font-medium outline-none transition-[color,transform] duration-300 focus-visible:ring-2 focus-visible:ring-ring active:scale-95 motion-reduce:transition-none ${
            target === i ? "text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}