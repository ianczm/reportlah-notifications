import { ReactNode } from "react";

import { cn } from "@/ui/utils/tailwind";

export function P1({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-lg font-bold text-light-600 md:text-xl", className)}>
      {children}
    </p>
  );
}
