"use client";

import { Button, Group, Stack } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

import { EventTag, Publisher, Tenant } from "@/backend/payload/payload-types";

import FeedbackButton from "./FeedbackButton";
import LandingContent from "../../(home)/register/LandingContent";

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
    <section className="mx-auto grid size-full max-w-screen-2xl grid-cols-[auto] grid-rows-[auto_auto] gap-5 xl:grid-cols-[1fr_1fr]  xl:grid-rows-[auto] xl:px-5">
      <LandingContent>
        <LandingContent.Text>
          <LandingContent.Text.Title>Give feedback</LandingContent.Text.Title>
          <LandingContent.Text.Description>
            You&apos;re giving feedback to {publisher.name}
          </LandingContent.Text.Description>
        </LandingContent.Text>
        <Group gap="xs">
          <Button component={Link} href="/">
            Back to Home
          </Button>
          <Button variant="outline" component={Link} href="/admin">
            Dashboard
          </Button>
        </Group>
      </LandingContent>
      <div className="flex flex-col justify-center max-xl:p-8">
        <Stack>
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
