import { ReactNode } from "react";

export function P1({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg font-bold text-light-600 md:text-xl">{children}</p>
  );
}
