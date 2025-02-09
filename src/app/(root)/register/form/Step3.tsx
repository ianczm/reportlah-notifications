"use client";

import { Button, TextInput } from "@mantine/core";

import { H2 } from "@/ui/components/typography/Header";
import { P1 } from "@/ui/components/typography/Paragraph";
import { cn } from "@/ui/utils/tailwind";

import { StepPageProps } from "./types";

function Step3({ form, pageHandlers, hidden }: StepPageProps) {
  return (
    <div
      className={cn("flex h-full flex-col justify-between px-8 py-16", {
        hidden: hidden,
      })}
    >
      <div className="flex flex-col gap-8">
        <P1 className="text-sm uppercase tracking-wider text-dark-400">
          Step 3 / 6
        </P1>
        <H2>Create your account</H2>
        <P1 className="text-dark-400">
          You&apos;ll use this to manage your shops
        </P1>
      </div>
      <div className="flex flex-col gap-8">
        <TextInput
          id="name"
          name="name"
          key={form.key("name")}
          {...form.getInputProps("name")}
          label="Your name"
          placeholder="Enter your name"
          type="text"
          required
        />
        <TextInput
          id="password"
          name="password"
          key={form.key("password")}
          {...form.getInputProps("password")}
          label="Your password"
          placeholder="Enter your password"
          type="password"
          required
        />
        <TextInput
          id="confirmPassword"
          name="confirmPassword"
          key={form.key("confirmPassword")}
          {...form.getInputProps("confirmPassword")}
          label="Confirm password"
          placeholder="Confirm password"
          type="password"
          required
        />
        <Button onClick={pageHandlers.next} fullWidth>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Step3;
