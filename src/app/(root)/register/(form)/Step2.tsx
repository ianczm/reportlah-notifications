"use client";

import { Button, PinInput } from "@mantine/core";
import { useState } from "react";

import { H2 } from "@/ui/components/typography/Header";
import { P1 } from "@/ui/components/typography/Paragraph";
import { cn } from "@/ui/utils/tailwind";

import { RegistrationFormStep } from "./RegistrationFormStep";
import { StepPageProps } from "./types";

function Step2({ step, totalSteps, hidden }: StepPageProps) {
  const [showCodeInput, setShowCodeInput] = useState(false);

  return (
    <RegistrationFormStep hidden={hidden}>
      <RegistrationFormStep.HeaderSection>
        <P1 className="text-sm uppercase tracking-wider text-dark-400">
          Step {step} / {totalSteps}
        </P1>
        <H2>We&apos;ve sent you an email</H2>
        <P1 className="text-dark-400">Go to your email to open the link</P1>
      </RegistrationFormStep.HeaderSection>
      <RegistrationFormStep.InputSection>
        <Button fullWidth>Open Email</Button>
        <div className="flex w-full items-center gap-4">
          <hr className="w-full border border-dark-400" />
          <P1 className="text-sm uppercase tracking-wider text-dark-400">OR</P1>
          <hr className="w-full border border-dark-400" />
        </div>
        <Button
          fullWidth
          onClick={() => setShowCodeInput(true)}
          className={cn({ hidden: showCodeInput })}
        >
          Enter the code
        </Button>
        <PinInput
          size="xl"
          className={cn({ hidden: !showCodeInput })}
          oneTimeCode
          classNames={{
            root: "justify-center",
          }}
        />
      </RegistrationFormStep.InputSection>
    </RegistrationFormStep>
  );
}

export default Step2;
