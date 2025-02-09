"use client";

import { Button } from "@mantine/core";

import PlacesAutocomplete from "@/ui/components/inputs/PlacesAutocomplete";
import { H2 } from "@/ui/components/typography/Header";
import { P1 } from "@/ui/components/typography/Paragraph";
import { cn } from "@/ui/utils/tailwind";

import { StepPageProps } from "./types";

function Step5({ form, pageHandlers, hidden }: StepPageProps) {
  return (
    <div
      className={cn("flex h-full flex-col justify-between px-8 py-16", {
        hidden: hidden,
      })}
    >
      <div className="flex flex-col gap-8">
        <P1 className="text-sm uppercase tracking-wider text-dark-400">
          Step 5 / 6
        </P1>
        <H2>Set up your first shop</H2>
        <P1 className="text-dark-400">Where is your shop located?</P1>
      </div>
      <div className="flex flex-col gap-8">
        <PlacesAutocomplete
          form={form}
          name="location"
          placeholder="Enter your shop address"
        />
        <Button onClick={pageHandlers.next} fullWidth>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Step5;
