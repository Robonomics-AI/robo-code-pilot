
import { Toaster as SonnerToaster, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof SonnerToaster>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerToaster
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#2C2C2C] group-[.toaster]:text-[var(--color-neutral-offwhite)] group-[.toaster]:border-[#444444] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[var(--color-neutral-mid)]",
          actionButton:
            "group-[.toast]:bg-[var(--color-accent-green)] group-[.toaster]:text-[var(--color-neutral-offwhite)]",
          cancelButton:
            "group-[.toast]:bg-[#383838] group-[.toaster]:text-[var(--color-neutral-mid)]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
