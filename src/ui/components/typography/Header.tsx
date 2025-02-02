import { ReactNode } from "react";

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display text-5xl uppercase tracking-tight md:text-6xl">
      {children}
    </h1>
  );
}
