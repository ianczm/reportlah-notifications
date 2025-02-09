"use client";

import { Button, TextInput } from "@mantine/core";

import { H2 } from "@/ui/components/typography/Header";
import { P1 } from "@/ui/components/typography/Paragraph";
import { cn } from "@/ui/utils/tailwind";

import { StepPageProps } from "./types";

function Step1({ form, pageHandlers, hidden }: StepPageProps) {
  return (
    <div
      className={cn("flex h-full flex-col justify-between px-8 py-16", {
        hidden: hidden,
      })}
    >
      <div className="flex flex-col gap-8">
        <P1 className="text-sm uppercase tracking-wider text-dark-400">
          Step 1 / 6
        </P1>
        <H2>Let&apos;s begin!</H2>
        <P1 className="text-dark-400">
          First, let&apos;s get your email address
        </P1>
      </div>
      <div className="flex flex-col gap-8">
        <TextInput
          id="email"
          name="email"
          key={form.key("email")}
          {...form.getInputProps("email")}
          label="Email address"
          placeholder="your@email.com"
          type="email"
          required
        />
        <Button onClick={pageHandlers.next} fullWidth>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Step1;
