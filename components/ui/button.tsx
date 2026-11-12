import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

/**
 * Buttons take their colours from the ground they sit on (see globals.css),
 * so the same variant is correct on charcoal, bone and red.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-[2px] border border-transparent font-semibold whitespace-nowrap select-none transition-[background-color,border-color,color,transform] duration-200 ease-out-expo active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [font-stretch:104%] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover",
        outline:
          "border-rule bg-transparent text-foreground hover:border-foreground hover:bg-foreground/6",
        ghost: "text-foreground hover:bg-foreground/8",
        link: "rounded-none underline decoration-rule hover:decoration-foreground",
      },
      size: {
        default: "h-11 px-5 text-[0.9375rem]",
        sm: "h-10 px-4 text-sm",
        lg: "h-13 px-7 text-base",
        icon: "size-11",
      },
    },
    // A text link keeps the 44px target height but takes no horizontal padding.
    compoundVariants: [
      { variant: "link", class: "h-auto min-h-11 px-0" },
    ],
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
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
