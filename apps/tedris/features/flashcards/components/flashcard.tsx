"use client";

import { Card } from "@madrasah/ui/components/card";
import { cn } from "@madrasah/ui/lib/utils";
import { ReactNode } from "react";

interface FlashCardProps {
  children: ReactNode;
  className?: string;
}

export default function FlashCard({ children, className }: FlashCardProps) {
  return (
    <Card
      className={cn(
        "relative flex h-[500px] w-[300px] select-none flex-col justify-center rounded-2xl p-4 text-center shadow-lg sm:p-6",
        className
      )}
    >
      {children}
    </Card>
  );
}
