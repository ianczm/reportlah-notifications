import { UseFormReturnType } from "@mantine/form";

import { RegistrationFormSchema } from "@/backend/features/register/validator";
import { Channel } from "@/backend/payload/payload-types";

export type PageHandlers = {
  prev: () => void;
  next: () => void;
};

export type StepPageProps = {
  step: number;
  totalSteps: number;
  form: UseFormReturnType<RegistrationFormSchema>;
  data: StepPageData;
  pageHandlers: PageHandlers;
  isPending: boolean;
  hidden: boolean;
};

export type ChannelGroup = {
  channelName: string;
  channels: Channel[];
};

export type ChannelOption = {
  group: string;
  items: { value: string; label: string }[];
};

export type StepPageData = {
  channelGroups: ChannelGroup[];
};
