import { ReactNode } from "react";

import { cn } from "@/ui/utils/tailwind";

import { H1 } from "../typography/Header";
import { P1 } from "../typography/Paragraph";

function Landing({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col justify-center gap-12 text-balance max-xl:min-h-[60vh] max-xl:items-center max-xl:text-center max-lg:px-8">
      {children}
    </div>
  );
}

function TextContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex max-w-xl flex-col gap-8", className)}>
      {children}
    </div>
  );
}

Landing.TextContainer = TextContainer;
TextContainer.Description = P1;
TextContainer.Title = H1;

export default Landing;
