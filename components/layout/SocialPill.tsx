// social-pill.tsx
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* Full class names are written out per brand so Tailwind can detect them.
   icon: colour of the icon at rest
   fill: the layer that grows in behind the icon on hover */
const socials = [
  {
    label: "YouTube",
    href: "https://youtube.com/@yourchannel",
    icon: FaYoutube,
    iconClass: "text-[#FF0000] group-hover:text-white",
    fillClass: "bg-[#FF0000]",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/yourhandle",
    icon: FaInstagram,
    iconClass: "text-[#E4405F] group-hover:text-white",
    fillClass:
      "bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)]",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@yourhandle",
    icon: FaTiktok,
    iconClass: "text-white group-hover:text-white",
    fillClass: "bg-black",
  },
];

export default function SocialPill({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Social media"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 p-1.5",
        "shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.35)]",
        "backdrop-blur-xl backdrop-saturate-150",
        className
      )}
    >
      {socials.map(({ label, href, icon: Icon, iconClass, fillClass }) => (
        <Button
          key={label}
          variant="ghost"
          size="icon"
          nativeButton={false}
          render={
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
            />
          }
          className={cn(
            "group relative h-10 w-10 overflow-hidden rounded-full p-0 sm:h-11 sm:w-11",
            "transition-transform duration-300 ease-out",
            "hover:-translate-y-0.5 hover:scale-110 active:scale-95",
            "hover:bg-transparent motion-reduce:transition-none motion-reduce:hover:transform-none"
          )}
        >
          {/* Fill that grows in from the centre on hover */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 scale-50 rounded-full opacity-0",
              "transition-all duration-300 ease-out",
              "group-hover:scale-100 group-hover:opacity-100",
              "motion-reduce:transition-none",
              fillClass
            )}
          />
          <Icon
            className={cn(
              "relative size-5 transition-colors duration-300 ease-out sm:size-[22px]",
              iconClass
            )}
          />
        </Button>
      ))}
    </nav>
  );
}