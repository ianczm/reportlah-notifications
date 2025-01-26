"use server";

import { z } from "zod";

import { actionClient } from "@/lib/safe-action";
import { log } from "@/lib/winston";

import { sendCourierRequest } from "../notifications/courier";
import payload from "../payload/payload";
import { EventType, Service } from "../payload/payload-types";

const EVENT_REQUEST_SCHEMA = z.object({
  publisherId: z.string().uuid(),
  eventTagId: z.string().uuid(),
});

type EventRequest = z.infer<typeof EVENT_REQUEST_SCHEMA>;

async function findEventTagById(id: string) {
  return await payload.findByID({
    id,
    collection: "event-tags",
    disableErrors: true,
  });
}

async function findPublisherById(id: string) {
  return await payload.findByID({
    id,
    collection: "publishers",
    disableErrors: true,
  });
}

async function raiseEvent(eventRequest: EventRequest) {
  const { publisherId, eventTagId } = eventRequest;
  log.info(
    `Raising event for Publisher: ${publisherId} and EventTag: ${eventTagId}`
  );

  const [publisher, eventTag] = await Promise.all([
    findPublisherById(publisherId),
    findEventTagById(eventTagId),
  ]);

  if (!(publisher && eventTag)) {
    throw new Error(
      `Could not find a valid configuration for EventTag: ${eventTagId} and Publisher: ${publisherId}`
    );
  }

  const eventType = eventTag["event-type"] as EventType;

  const event = await payload.create({
    collection: "events",
    data: {
      publisher: publisher.id,
      tag: eventTag.id,
      type: eventType.id,
    },
  });

  log.info(`Event created: ${event.id}`);

  sendCourierRequest({
    event: {
      id: event.id,
      publisher: publisher,
      tag: eventTag,
      type: eventType,
    },
    service: publisher.service as Service,
  });
}

export const raiseEventAction = actionClient
  .schema(EVENT_REQUEST_SCHEMA)
  .action(async ({ parsedInput }) => raiseEvent(parsedInput));
