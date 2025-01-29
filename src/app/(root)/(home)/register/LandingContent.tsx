import { ReactNode } from "react";

function LandingContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col justify-center gap-12">{children}</div>
  );
}

function Text({ children }: { children: ReactNode }) {
  return <div className="mr-40 flex flex-col gap-8">{children}</div>;
}

function Description({ children }: { children: ReactNode }) {
  return <p className="text-xl font-bold text-light-600">{children}</p>;
}

function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display text-6xl uppercase tracking-tight text-light-700">
      {children}
    </h1>
  );
}

LandingContent.Text = Text;
Text.Description = Description;
Text.Title = Title;

export default LandingContent;
