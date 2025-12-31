import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-white/15 backdrop-blur-xl border border-white/25 text-white hover:bg-white/25 hover:border-white/40 shadow-glass",
        destructive: "bg-destructive/80 backdrop-blur-xl border border-destructive/50 text-white hover:bg-destructive/90",
        outline: "border border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/15",
        secondary: "bg-white/10 backdrop-blur-xl border border-white/15 text-white hover:bg-white/20",
        ghost: "text-white hover:bg-white/10",
        link: "text-white underline-offset-4 hover:underline",
        // 毛玻璃按钮变体
        glass: "bg-white/15 backdrop-blur-xl border border-white/25 text-white hover:bg-white/25 hover:border-white/40 shadow-glass",
        "glass-primary": "bg-primary/60 backdrop-blur-xl border border-primary/40 text-white hover:bg-primary/80 shadow-glass",
        sky: "bg-primary/70 backdrop-blur-xl border border-primary/50 text-white hover:bg-primary/90 shadow-glass",
        nature: "bg-secondary/70 backdrop-blur-xl border border-secondary/50 text-white hover:bg-secondary/90 shadow-glass",
        sunset: "bg-accent/70 backdrop-blur-xl border border-accent/50 text-white hover:bg-accent/90 shadow-glass",
        nav: "bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:bg-white/30 shadow-glass",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base",
        xl: "h-14 rounded-2xl px-8 text-lg",
        icon: "h-10 w-10",
        "icon-lg": "h-12 w-12 rounded-xl",
        "icon-xl": "h-14 w-14 rounded-xl",
        touch: "h-12 min-w-[120px] rounded-xl px-6",
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
