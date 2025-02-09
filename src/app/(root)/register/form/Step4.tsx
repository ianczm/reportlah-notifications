"use client";

import { Button, TextInput } from "@mantine/core";

import { H2 } from "@/ui/components/typography/Header";
import { P1 } from "@/ui/components/typography/Paragraph";
import { cn } from "@/ui/utils/tailwind";

import { StepPageProps } from "./types";

function Step4({ form, pageHandlers, hidden }: StepPageProps) {
  return (
    <div
      className={cn("flex h-full flex-col justify-between px-8 py-16", {
        hidden: hidden,
      })}
    >
      <div className="flex flex-col gap-8">
        <P1 className="text-sm uppercase tracking-wider text-dark-400">
          Step 4 / 6
        </P1>
        <H2>Set up your first shop</H2>
        <P1 className="text-dark-400">What should we call your shop?</P1>
      </div>
      <div className="flex flex-col gap-8">
        <TextInput
          id="tenantName"
          name="tenantName"
          key={form.key("tenantName")}
          {...form.getInputProps("tenantName")}
          label="Shop name"
          placeholder="Enter your shop name"
          type="text"
          required
        />
        <Button onClick={pageHandlers.next} fullWidth>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Step4;
