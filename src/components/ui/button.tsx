import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // --- Varian Warna Kustom ---

        // Varian 'default' -> Menggunakan warna Accent (brown-accent)
        default: "bg-brown-accent text-white hover:bg-brown-accent/90",

        // Varian 'destructive' (Tetap menggunakan default destructive Tailwind/Shadcn untuk kontras)
        destructive: "bg-red-600 text-white hover:bg-red-600/90",

        // Varian 'outline' -> Border dan teks brown-dark, latar belakang brown-light/white
        // Hover: bg-brown-light, text-brown-dark
        outline:
          "border border-brown-accent/50 bg-white text-brown-dark hover:bg-brown-light hover:text-brown-dark",

        // Varian 'secondary' -> Menggunakan warna yang lebih kalem (brown-light)
        secondary: "bg-brown-light text-brown-dark hover:bg-brown-light/80",

        // Varian 'ghost' -> Latar belakang transparan, hover brown-light
        ghost: "hover:bg-brown-light hover:text-brown-dark",

        // Varian 'link' -> Teks brown-accent
        link: "text-brown-accent underline-offset-4 hover:underline",

        // Tambahan: 'Brown-Dark' untuk tombol dengan latar belakang Espresso
        "brown-dark": "bg-brown-dark text-white hover:bg-brown-dark/90",
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
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
