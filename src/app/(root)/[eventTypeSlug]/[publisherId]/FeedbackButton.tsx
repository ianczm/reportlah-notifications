"use client";

import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAction } from "next-safe-action/hooks";
import { ReactNode } from "react";

import { raiseEventAction } from "@/backend/actions/events";
import { EventTag, Publisher, Tenant } from "@/backend/payload/payload-types";

export type FeedbackButtonProps = {
  publisher: Publisher;
  tenant: Tenant;
  eventTag: EventTag;
  children: ReactNode;
  onExecute: () => void;
  onSettled: () => void;
  disabled: boolean;
};

function FeedbackButton({
  publisher,
  tenant,
  eventTag,
  children,
  onExecute: notifyParentOfExecution,
  onSettled,
  disabled,
}: FeedbackButtonProps) {
  const { executeAsync, isPending } = useAction(raiseEventAction, {
    onExecute: () => {
      notifications.show({
        title: "Thank you for your feedback!",
        message: "Please give us a moment while we send out the alert...",
        color: "blue",
      });
      notifyParentOfExecution();
    },
    onSuccess: () => {
      notifications.show({
        title: "Feedback sent!",
        message: `We have alerted ${tenant.name} of ${eventTag.name}.`,
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Feedback failed to send",
        message: `We were unable to alert ${tenant.name} of ${eventTag.name}.`,
        color: "red",
      });
    },
    onSettled,
  });

  const handleClick = async (eventTag: EventTag) => {
    await executeAsync({
      publisherId: publisher.id,
      eventTagId: eventTag.id,
    });
  };

  return (
    <Button
      key={eventTag.id}
      onClick={async () => await handleClick(eventTag)}
      loading={isPending}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export default FeedbackButton;
