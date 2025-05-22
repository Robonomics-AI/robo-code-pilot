
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border border-[#777777] bg-[#383838] px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground text-[var(--color-neutral-offwhite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-cyan)] focus-visible:border-transparent focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
