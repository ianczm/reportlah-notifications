"use client";

import { Stack } from "@mantine/core";
import { useState } from "react";

import { EventTag, Publisher, Tenant } from "@/backend/payload/payload-types";

import FeedbackButton from "./FeedbackButton";

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
  const [pendingEvent, setPendingEvent] = useState<EventTag | null>(null);

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
              <FeedbackButton
                key={eventTag.id}
                tenant={tenant}
                publisher={publisher}
                eventTag={eventTag}
                onExecute={() => setPendingEvent(eventTag)}
                onSettled={() => setPendingEvent(null)}
                disabled={pendingEvent !== null && pendingEvent !== eventTag}
              >
                {eventTag.name}
              </FeedbackButton>
            ))}
        </Stack>
      </div>
    </section>
  );
}

export default FeedbackSection;
