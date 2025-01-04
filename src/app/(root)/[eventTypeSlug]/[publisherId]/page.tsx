import { notFound } from "next/navigation";
import { z } from "zod";

import payload from "@/backend/payload/payload";
import { EventTag, EventType, Tenant } from "@/backend/payload/payload-types";

import FeedbackSection from "./FeedbackSection";

const fetchData = async (publisherId: string, eventTypeSlug: string) => {
  const parsedResult = z.string().uuid().safeParse(publisherId);

  if (!parsedResult.success) {
    notFound();
  }

  const publisher = await payload.findByID({
    collection: "publishers",
    id: parsedResult.data,
    disableErrors: true,
  });

  if (!publisher) {
    notFound();
  }

  const tenant = publisher.tenant as Tenant;
  const eventTags = publisher["supported-event-tags"] as EventTag[];

  const data = {
    publisher,
    tenant,
    eventTags: eventTags.filter((eventTag) => {
      const eventType = eventTag["event-type"] as EventType;
      return eventType.slug === eventTypeSlug;
    }),
  };

  if (data.eventTags.length === 0) {
    notFound();
  }

  return data;
};

async function FeedbackPage({
  params,
}: {
  params: Promise<{
    eventTypeSlug: string;
    publisherId: string;
  }>;
}) {
  const { publisherId, eventTypeSlug } = await params;
  const data = await fetchData(publisherId, eventTypeSlug);

  return (
    <main>
      <FeedbackSection {...data} />
    </main>
  );
}

export default FeedbackPage;
