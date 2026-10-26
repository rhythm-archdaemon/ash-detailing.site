import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * Shared "raised" geometry used by every filled variant.
 *  - before: the solid button face
 *  - after:  an outlined rectangle offset down and to the right, behind the face
 *  - pressed: the button slides onto the outline while the outline stays put,
 *            so the face covers it completely and the outline looks filled in
 */
const raised = [
  "relative isolate",
  "before:absolute before:inset-0 before:-z-10 before:border-2 before:border-(color:--btn-line) before:bg-(color:--btn-face) before:transition-colors before:duration-100",
  "after:absolute after:inset-0 after:-z-20 after:border-2 after:border-(color:--btn-edge) after:translate-x-(--btn-o) after:translate-y-(--btn-o) after:transition-transform after:duration-100",
  "active:translate-x-(--btn-o) active:translate-y-(--btn-o) active:after:translate-x-0 active:after:translate-y-0",
].join(" ")

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none font-bold whitespace-nowrap select-none outline-none transition-[translate,background-color,color,box-shadow] duration-100 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-3 aria-invalid:ring-destructive/30 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Primary: opaque gold face, gold outline behind it
        default: `${raised} text-primary-foreground [--btn-face:var(--primary)] [--btn-line:var(--btn-face)] [--btn-edge:var(--primary)] hover:[--btn-face:color-mix(in_oklch,var(--primary),white_14%)]`,
        // Soft gold wash face, gold outline
        secondary: `${raised} text-secondary-foreground [--btn-face:var(--secondary)] [--btn-line:var(--btn-face)] [--btn-edge:var(--primary)] hover:[--btn-face:color-mix(in_oklch,var(--secondary),var(--primary)_28%)]`,
        // Ink border and ink outline on the page background
        outline: `${raised} text-foreground [--btn-face:var(--background)] [--btn-line:var(--foreground)] [--btn-edge:var(--foreground)] hover:[--btn-face:color-mix(in_oklch,var(--background),var(--primary)_16%)]`,
        // Opaque red face, red outline
        destructive: `${raised} text-white [--btn-face:var(--destructive)] [--btn-line:var(--btn-face)] [--btn-edge:var(--destructive)] hover:[--btn-face:color-mix(in_oklch,var(--destructive),black_12%)]`,
        // Flat variants: no face, no offset outline
        ghost: "text-foreground hover:bg-secondary hover:text-secondary-foreground aria-expanded:bg-secondary active:translate-y-px",
        link: "text-secondary-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-2 px-5 text-sm [--btn-o:4px] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-6 gap-1 px-2.5 text-xs [--btn-o:2px] [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3.5 text-xs [--btn-o:3px] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 px-7 text-xl [--btn-o:5px] has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6",
        icon: "size-10 [--btn-o:4px]",
        "icon-xs": "size-6 [--btn-o:2px] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 [--btn-o:3px]",
        "icon-lg": "size-24 [--btn-o:5px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }