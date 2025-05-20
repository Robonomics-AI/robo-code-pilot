
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-primary-core)] text-white hover:bg-opacity-90 dark:bg-primary dark:text-primary-foreground dark:hover:brightness-110",
        destructive:
          "bg-[var(--color-dynamic-red)] text-white hover:bg-opacity-90 dark:bg-destructive dark:text-destructive-foreground dark:hover:brightness-110",
        outline:
          "border-2 border-[var(--color-primary-core)] text-[var(--color-primary-core)] hover:bg-[var(--color-primary-core)] hover:text-white dark:border-accent dark:text-accent dark:hover:bg-accent dark:hover:text-accent-foreground",
        secondary:
          "bg-[var(--color-neutral-light)] text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-mid)] dark:bg-secondary dark:text-secondary-foreground dark:hover:brightness-110",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-[var(--color-primary-core)] underline-offset-4 hover:underline dark:text-accent",
        accent: "bg-[var(--color-accent-green)] text-white hover:bg-opacity-90 dark:hover:brightness-110",
        warning: "bg-[var(--color-accent-orange)] text-white hover:bg-opacity-90 dark:hover:brightness-110",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
