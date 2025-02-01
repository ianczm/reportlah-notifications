import { ReactNode } from "react";

function LandingContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col justify-center gap-12 text-balance max-xl:min-h-[75vh] max-xl:items-center max-xl:text-center max-lg:px-8">
      {children}
    </div>
  );
}

function Text({ children }: { children: ReactNode }) {
  return <div className="flex max-w-xl flex-col gap-8">{children}</div>;
}

function Description({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg font-bold text-light-600 md:text-xl">{children}</p>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display text-5xl uppercase tracking-tight md:text-6xl">
      {children}
    </h1>
  );
}

LandingContent.Text = Text;
Text.Description = Description;
Text.Title = Title;

export default LandingContent;
