"use client";

import { Button, Checkbox, Select, TextInput } from "@mantine/core";

import { H2 } from "@/ui/components/typography/Header";
import { P1 } from "@/ui/components/typography/Paragraph";

import { RegistrationFormStep } from "./RegistrationFormStep";
import { ChannelGroup, ChannelOption, StepPageProps } from "./types";

function channelGroupToOptions(channelGroups: ChannelGroup[]): ChannelOption[] {
  return channelGroups.map((channelGroup) => ({
    group: channelGroup.channelName,
    items: channelGroup.channels.map((channel) => ({
      label: channel.recipientType,
      value: channel.id,
    })),
  }));
}

function Step6({
  step,
  totalSteps,
  form,
  data: { channelGroups },
  isPending,
  hidden,
}: StepPageProps) {
  return (
    <RegistrationFormStep hidden={hidden}>
      <RegistrationFormStep.HeaderSection>
        <P1 className="text-sm uppercase tracking-wider text-dark-400">
          Step {step} / {totalSteps}
        </P1>
        <H2>Almost there...</H2>
        <P1 className="text-dark-400">How would you like to be notified?</P1>
      </RegistrationFormStep.HeaderSection>
      <RegistrationFormStep.InputSection>
        <Select
          id="channelId"
          name="channelId"
          key={form.key("channelId")}
          {...form.getInputProps("channelId")}
          label="Notifications Channel"
          placeholder="Select your channel"
          data={channelGroupToOptions(channelGroups)}
          required
        />
        <TextInput
          id="recipient"
          name="recipient"
          key={form.key("recipient")}
          {...form.getInputProps("recipient")}
          label="Recipient"
          placeholder="Enter your identifier"
          type="text"
          required
        />
        <Checkbox
          id="terms"
          name="terms"
          key={form.key("terms")}
          {...form.getInputProps("terms", { type: "checkbox" })}
          label="I agree to the terms and conditions"
          required
        />
        <Button type="submit" fullWidth loading={isPending}>
          Finish
        </Button>
      </RegistrationFormStep.InputSection>
    </RegistrationFormStep>
  );
}

export default Step6;
