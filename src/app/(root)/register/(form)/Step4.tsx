"use client";

import { Button, TextInput } from "@mantine/core";

import { H2 } from "@/ui/components/typography/Header";
import { P1 } from "@/ui/components/typography/Paragraph";

import { RegistrationFormStep } from "./RegistrationFormStep";
import { StepPageProps } from "./types";

function Step4({ form, pageHandlers, hidden }: StepPageProps) {
  return (
    <RegistrationFormStep hidden={hidden}>
      <RegistrationFormStep.HeaderSection>
        <P1 className="text-sm uppercase tracking-wider text-dark-400">
          Step 4 / 6
        </P1>
        <H2>Set up your first shop</H2>
        <P1 className="text-dark-400">What should we call your shop?</P1>
      </RegistrationFormStep.HeaderSection>
      <RegistrationFormStep.InputSection>
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
      </RegistrationFormStep.InputSection>
    </RegistrationFormStep>
  );
}

export default Step4;
