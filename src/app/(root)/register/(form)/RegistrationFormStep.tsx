import { ReactNode } from "react";

import { cn } from "@/ui/utils/tailwind";

export function RegistrationFormStep({
  children,
  hidden,
}: {
  children: ReactNode;
  hidden: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("flex h-full flex-col justify-between gap-8", {
        hidden: hidden,
      })}
    >
      {children}
    </div>
  );
}

function HeaderSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4 p-8", className)}>{children}</div>
  );
}

function InputSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-8 p-8", className)}>{children}</div>
  );
}

RegistrationFormStep.HeaderSection = HeaderSection;
RegistrationFormStep.InputSection = InputSection;
