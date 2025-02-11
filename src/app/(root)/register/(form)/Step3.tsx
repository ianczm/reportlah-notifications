"use client";

import { Button, TextInput } from "@mantine/core";

import { H2 } from "@/ui/components/typography/Header";
import { P1 } from "@/ui/components/typography/Paragraph";

import { RegistrationFormStep } from "./RegistrationFormStep";
import { StepPageProps } from "./types";

function Step3({
  step,
  totalSteps,
  form,
  pageHandlers,
  hidden,
}: StepPageProps) {
  return (
    <RegistrationFormStep hidden={hidden}>
      <RegistrationFormStep.HeaderSection>
        <P1 className="text-sm uppercase tracking-wider text-dark-400">
          Step {step} / {totalSteps}
        </P1>
        <H2>Account details</H2>
        <P1 className="text-dark-400">
          You&apos;ll use these credentials to log into your admin dashboard
        </P1>
      </RegistrationFormStep.HeaderSection>
      <RegistrationFormStep.InputSection>
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
      </RegistrationFormStep.InputSection>
    </RegistrationFormStep>
  );
}

export default Step3;
