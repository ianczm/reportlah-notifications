import { notFound } from "next/navigation";
import { z } from "zod";

import payload from "@/backend/payload/payload";
import { EventType } from "@/backend/payload/payload-types";

export async function POST(request: Request) {
  const parsedRequest = z
    .object({
      publisherId: z.string().uuid(),
      eventTagId: z.string().uuid(),
    })
    .safeParse(await request.json());

  if (!parsedRequest.success) {
    return notFound();
  }

  const { publisherId, eventTagId } = parsedRequest.data;

  const eventTag = await payload.findByID({
    id: eventTagId,
    collection: "event-tags",
    select: {
      name: true,
      "event-type": true,
    },
    disableErrors: true,
  });

  const publisher = await payload.findByID({
    id: publisherId,
    collection: "publishers",
    disableErrors: true,
  });

  if (!(eventTag && publisher)) {
    notFound();
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

  return Response.json({ event }, { status: 201 });
}
