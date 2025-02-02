"use client";

import { useState } from "react";

import { EventTag, Publisher, Tenant } from "@/backend/payload/payload-types";

import FeedbackButton from "./FeedbackButton";

type FeedbackButtonGroupProps = {
  eventTags: EventTag[];
  tenant: Tenant;
  publisher: Publisher;
};

function FeedbackButtonGroup({
  eventTags,
  tenant,
  publisher,
}: FeedbackButtonGroupProps) {
  const [pendingEvent, setPendingEvent] = useState<EventTag | null>(null);
  return eventTags.map((eventTag) => (
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
  ));
}

export default FeedbackButtonGroup;
