"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@madrasah/ui/lib/utils";

interface SeparatorProps extends Omit<React.ComponentProps<typeof SeparatorPrimitive.Root>, "children"> {
  label?: string;
  labelClassName?: string;
}

function Separator({ className, orientation = "horizontal", decorative = true, label, labelClassName, ...props }: SeparatorProps) {
  // If there's a label, render the labeled version
  if (label) {
    return (
      <div className={cn("relative flex items-center", orientation === "vertical" ? "flex-col h-full" : "w-full", className)}>
        <div className={cn("bg-border shrink-0", orientation === "horizontal" ? "h-px flex-1" : "w-px flex-1")} />
        <span
          className={cn(
            "bg-background px-3 py-1 text-sm text-muted-foreground whitespace-nowrap",
            orientation === "vertical" ? "rotate-90" : "",
            labelClassName,
          )}
        >
          {label}
        </span>
        <div className={cn("bg-border shrink-0", orientation === "horizontal" ? "h-px flex-1" : "w-px flex-1")} />
      </div>
    );
  }

  // Default separator without label
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
