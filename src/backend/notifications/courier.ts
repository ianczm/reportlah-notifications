import { SendMessageRequest } from "@trycourier/courier/api";
import { compile } from "handlebars";

import { courier } from "@/lib/courier";

import payload from "../payload/payload";
import {
  Channel,
  EventTag,
  EventType,
  Publisher,
  Service,
  Subscriber,
  SubscriberChannel,
  Template,
} from "../payload/payload-types";

type PopulatedEvent = {
  event: { id: string; publisher: Publisher; tag: EventTag; type: EventType };
  service: Service;
};

export async function sendCourierRequest({
  event,
  service,
}: PopulatedEvent): Promise<void> {
  const { publisher, tag: eventTag, type: eventType } = event;

  const matchingEvents = await payload.find({
    collection: "events",
    where: {
      and: [
        {
          tag: {
            equals: eventTag.id,
          },
        },
        {
          type: {
            equals: eventType.id,
          },
        },
      ],
    },
    pagination: false,
  });

  const subscriptions = await payload.find({
    collection: "subscriptions",
    where: {
      publisher: {
        equals: publisher.id,
      },
    },
    pagination: false,
  });

  const requests = subscriptions.docs.map(async (subscription) => {
    const subscriber = subscription.subscriber as Subscriber;
    const subscriberChannelIds = subscriber.subscriberChannels
      ?.docs as string[];

    const subscriberChannels = await payload.find({
      collection: "subscriber-channels",
      where: {
        id: {
          in: subscriberChannelIds,
        },
      },
    });

    const requestConstructions = subscriberChannels.docs.map(
      async (subscriberChannel) => {
        const channel = subscriberChannel.channel as Channel;

        const template = await payload.find({
          collection: "templates",
          where: {
            and: [
              {
                publisher: {
                  equals: publisher.id,
                },
              },
              {
                channel: {
                  equals: channel.id,
                },
              },
            ],
          },
        });

        if (template.docs.length <= 0) {
          throw new Error(
            `Template not found for publisher: ${publisher.id} and channel: ${channel.id}.`
          );
        }

        const request = await buildCourierRequest({
          subscriberChannel,
          template: template.docs[0],
          service: service,
          eventType,
          eventTag,
          count: matchingEvents.docs.length,
        });

        await payload.create({
          collection: "notifications",
          data: {
            "subscriber-channel": subscriberChannel.id,
            event: event.id,
            subscription: subscription.id,
            body: request as unknown as Record<string, never>,
          },
        });

        await courier.send(request);
      }
    );

    return Promise.all(requestConstructions);
  });

  await Promise.all(requests);
}

export type BuildNotificationMessageParams = {
  subscriberChannel: SubscriberChannel;
  template: Template;
  service: Service;
  eventType: EventType;
  eventTag: EventTag;
  count: number;
};

export async function buildCourierRequest({
  subscriberChannel,
  template: templateRecord,
  service,
  eventType,
  eventTag,
  count,
}: BuildNotificationMessageParams): Promise<SendMessageRequest> {
  const template = templateRecord.data as {
    templateId: string;
    templateData: { title: string; body: string };
  };

  const compiledData = {
    title: compile(template.templateData.title)({
      serviceName: service.name,
      eventTypeName: eventType.name,
    }),
    body: compile(template.templateData.body)({
      count,
      eventTypeName: eventType.name,
      eventTagName: eventTag.name,
    }),
  };

  return {
    message: {
      to: {
        user_id: subscriberChannel.recipient,
      },
      template: template.templateId,
      data: compiledData,
    },
  };
}
