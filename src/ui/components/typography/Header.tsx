import { ReactNode } from "react";

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display text-5xl uppercase tracking-tight md:text-6xl">
      {children}
    </h1>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-3xl uppercase md:text-4xl">{children}</h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-2xl uppercase md:text-3xl">{children}</h2>
  );
}
