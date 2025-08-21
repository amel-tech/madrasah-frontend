"use client";

import { cn } from "@madrasah/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TabView = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const activeTab = pathname.split("/").pop();

  return (
    <>
      <div className="border-b border-b-gray-300 mb-8">
        <div className="flex gap-4 container mx-auto">
          <Link
            href="/home"
            className={cn(
              "px-4 py-2 text-sm font-medium",
              activeTab === "home" &&
                "text-brand-primary border-b-2 border-brand-primary"
            )}
          >
            <span>Home</span>
          </Link>
          <Link
            prefetch
            href="/learning"
            className={cn(
              "px-4 py-2 text-sm font-medium",
              activeTab === "learning" &&
                "text-brand-primary border-b-2 border-brand-primary"
            )}
          >
            <span>Learning</span>
          </Link>
          <Link
            prefetch
            href="/cards"
            className={cn(
              "px-4 py-2 text-sm font-medium",
              activeTab === "cards" &&
                "text-brand-primary border-b-2 border-brand-primary"
            )}
          >
            <span>Cards</span>
          </Link>
        </div>
      </div>
      <main className="container mx-auto py-2">{children}</main>
    </>
  );
};
