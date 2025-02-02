import { notFound } from "next/navigation";
import { z } from "zod";

import payload from "@/backend/payload/payload";
import {
  EventTag,
  EventType,
  Publisher,
  Tenant,
} from "@/backend/payload/payload-types";

export async function getFeedbackTagData(
  publisherId: string,
  eventTypeSlug: string
) {
  validatePublisherId(publisherId);
  const publisher = await getPublisherById(publisherId);
  const eventTags = publisher["supported-event-tags"] as EventTag[];
  return validateFeedbackTagData({
    publisher,
    tenant: publisher.tenant as Tenant,
    eventTags: eventTags.filter(matchesEventType(eventTypeSlug)),
  });
}

async function getPublisherById(publisherId: string) {
  const publisher = await payload.findByID({
    collection: "publishers",
    id: publisherId,
    disableErrors: true,
    depth: 2,
  });

  if (!publisher) {
    notFound();
  }
  return publisher;
}

function matchesEventType(
  eventTypeSlug: string
): (value: EventTag, index: number, array: EventTag[]) => unknown {
  return (eventTag) => {
    const eventType = eventTag["event-type"] as EventType;
    return eventType.slug === eventTypeSlug;
  };
}

function validatePublisherId(publisherId: string) {
  const parsedResult = z.string().uuid().safeParse(publisherId);

  if (!parsedResult.success) {
    notFound();
  }
}

function validateFeedbackTagData(data: {
  publisher: Publisher;
  tenant: Tenant;
  eventTags: EventTag[];
}) {
  if (data.eventTags.length === 0) {
    notFound();
  }
  return data;
}
