import { SendMessageRequest } from "@trycourier/courier/api";
import { compile } from "handlebars";

import { courier } from "@/lib/courier";
import { log } from "@/lib/winston";

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

const REQUEST_FACTORY: Record<
  string,
  (params: BuildNotificationMessageParams) => Promise<SendMessageRequest>
> = {
  courier: buildCourierRequest,
  discord: buildCourierDiscordRequest,
};

export async function sendCourierRequest({
  event,
  service,
}: PopulatedEvent): Promise<void> {
  log.info(`Sending courier request for event ${event.id}.`);

  const { publisher, tag: eventTag, type: eventType, id: eventId } = event;

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

  log.info(
    `Found ${matchingEvents.docs.length} matching events and ${subscriptions.docs.length} subscriptions for event ${eventId}.`
  );

  const requests = subscriptions.docs.map(async (subscription) => {
    const subscriber = subscription.subscriber as Subscriber;
    const subscriberChannelIds = subscriber.subscriberChannels
      ?.docs as string[];

    const subscriberChannels = await payload.find({
      collection: "subscriber-channels",
      where: {
        and: [
          {
            id: {
              in: subscriberChannelIds,
            },
          },
          {
            enabled: {
              equals: true,
            },
          },
        ],
      },
    });

    log.info(
      `Found ${subscriberChannels.docs.length} enabled subscriber channels for subscriber ${subscriber.id} for event ${eventId}.`
    );

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
            `Template not found for publisher ${publisher.id} and channel ${channel.id} for event ${eventId}.`
          );
        }

        const channelName = channel.name.toLowerCase();
        const channelRequestBuilder = REQUEST_FACTORY[channelName];

        const request = await channelRequestBuilder({
          subscriberChannel,
          template: template.docs[0],
          service: service,
          eventType,
          eventTag,
          eventId,
          count: matchingEvents.docs.length,
        });

        const notification = await payload.create({
          collection: "notifications",
          data: {
            "subscriber-channel": subscriberChannel.id,
            event: event.id,
            subscription: subscription.id,
            body: request as unknown as Record<string, never>,
          },
        });

        log.info(`Notification created: ${notification.id} for ${eventId}`);

        await courier.send(request);
        log.info(
          `Sent notification for ${eventId} to ${subscriberChannel.id}.`,
          { request }
        );
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
  eventId: string;
  count: number;
};

export async function buildCourierDiscordRequest({
  subscriberChannel,
  template: templateRecord,
  service,
  eventType,
  eventTag,
  eventId,
  count,
}: BuildNotificationMessageParams): Promise<SendMessageRequest> {
  log.info(
    `Building Discord request for subscriber channel ${subscriberChannel.id} for event ${eventId}.`
  );

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
        discord: { user_id: subscriberChannel.recipient },
      },
      template: template.templateId,
      data: compiledData,
    },
  };
}

export async function buildCourierRequest({
  subscriberChannel,
  template: templateRecord,
  service,
  eventType,
  eventTag,
  eventId,
  count,
}: BuildNotificationMessageParams): Promise<SendMessageRequest> {
  log.info(
    `Building Courier request for subscriber channel ${subscriberChannel.id} for event ${eventId}.`
  );

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
