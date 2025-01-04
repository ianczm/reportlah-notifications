"use client";

import { Button, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { EventTag, Publisher, Tenant } from "@/backend/payload/payload-types";

export type FeedbackSectionProps = {
  publisher: Publisher;
  tenant: Tenant;
  eventTags: EventTag[];
};

function FeedbackSection({
  publisher,
  tenant,
  eventTags,
}: FeedbackSectionProps) {
  const handleOptionClick = async (eventTag: EventTag) => {
    await fetch("/api/notify", {
      method: "POST",
      body: JSON.stringify({
        publisherId: publisher.id,
        eventTagId: eventTag.id,
      }),
    });

    notifications.show({
      title: "Feedback sent!",
      message: `You let ${tenant.name} know about ${eventTag.name}.`,
    });
  };

  return (
    <section className="mx-auto grid h-screen max-w-screen-xl grid-cols-2 items-center gap-8">
      <div>
        <h2 className="mb-4 text-6xl font-extrabold">
          You&apos;re giving feedback to
        </h2>
        <p>
          {tenant.name}: {publisher.id}
        </p>
      </div>
      <div>
        <h2 className="mb-4 text-4xl">Feedback options</h2>
        <Stack gap="xs">
          {eventTags &&
            eventTags.map((eventTag) => (
              <Button
                key={eventTag.id}
                onClick={() => handleOptionClick(eventTag)}
              >
                {eventTag.name}
              </Button>
            ))}
        </Stack>
      </div>
    </section>
  );
}

export default FeedbackSection;
