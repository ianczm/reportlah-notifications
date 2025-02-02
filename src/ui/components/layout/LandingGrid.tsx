import { ReactNode } from "react";

function LandingGrid({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto grid size-full max-w-screen-2xl grid-cols-[auto] grid-rows-[auto_auto] gap-5 xl:grid-cols-[1fr_1fr] xl:grid-rows-[auto] xl:px-5">
      {children}
    </section>
  );
}

export default LandingGrid;
