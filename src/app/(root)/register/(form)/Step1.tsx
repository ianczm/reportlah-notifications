"use client";

import { Button, TextInput } from "@mantine/core";

import { H2 } from "@/ui/components/typography/Header";
import { P1 } from "@/ui/components/typography/Paragraph";

import { RegistrationFormStep } from "./RegistrationFormStep";
import { StepPageProps } from "./types";

function Step1({ form, pageHandlers, hidden }: StepPageProps) {
  return (
    <RegistrationFormStep hidden={hidden}>
      <RegistrationFormStep.HeaderSection>
        <P1 className="text-sm uppercase tracking-wider text-dark-400">
          Step 1 / 6
        </P1>
        <H2>Create a business account</H2>
        <P1 className="text-dark-400">
          This is the account you will use to manage your shops and reports
        </P1>
      </RegistrationFormStep.HeaderSection>
      <RegistrationFormStep.InputSection>
        <TextInput
          id="email"
          name="email"
          key={form.key("email")}
          {...form.getInputProps("email")}
          label="Email address"
          placeholder="operations@business.com"
          type="email"
          required
        />
        <Button onClick={pageHandlers.next} fullWidth>
          Next
        </Button>
      </RegistrationFormStep.InputSection>
    </RegistrationFormStep>
  );
}

export default Step1;
