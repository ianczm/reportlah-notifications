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
} from "../payload/payload-types";

type CourierTemplateData = {
  templateId: string;
  templateData: { title: string; body: string };
};

type PopulatedEvent = {
  event: { id: string; publisher: Publisher; tag: EventTag; type: EventType };
  service: Service;
};

const REQUEST_FACTORY: Record<
  string,
  Record<
    string,
    {
      requestKey: string;
      builder: (
        params: BuildNotificationMessageParams
      ) => Promise<SendMessageRequest>;
    }
  >
> = {
  courier: {
    default: { requestKey: "user_id", builder: buildCourierRequest },
  },
  discord: {
    user: { requestKey: "user_id", builder: buildCourierDiscordUserRequest },
    channel: {
      requestKey: "channel_id",
      builder: buildCourierDiscordUserRequest,
    },
  },
};

async function getTemplateDataOrDefault(
  publisher: Publisher,
  channel: Channel,
  eventId: string
): Promise<CourierTemplateData> {
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

  if (template.docs.length > 0) {
    return template.docs[0].data as CourierTemplateData;
  }

  log.info(
    `Custom template not found for publisher ${publisher.id} and channel ${channel.id} for event ${eventId}, searching for default template.`
  );

  const defaultTemplate = await payload.find({
    collection: "default-templates",
    where: {
      channel: {
        equals: channel.id,
      },
    },
  });

  if (defaultTemplate.docs.length > 0) {
    return defaultTemplate.docs[0].data as CourierTemplateData;
  }

  const errorMessage = `No template nor default template was found for publisher ${publisher.id} and channel ${channel.id} for event ${eventId}.`;
  log.error(errorMessage);
  throw new Error(errorMessage);
}

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

        const template = await getTemplateDataOrDefault(
          publisher,
          channel,
          eventId
        );

        const channelProvider = channel.provider.toLowerCase();
        const channelType = channel.recipientType.toLowerCase();
        const { requestKey, builder } =
          REQUEST_FACTORY[channelProvider][channelType];

        log.info(
          `Found request key for channel ${channel.id}, ${channel.name}`
        );

        const request = await builder({
          requestKey,
          subscriberChannel,
          template: template,
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
  requestKey: string;
  subscriberChannel: SubscriberChannel;
  template: CourierTemplateData;
  service: Service;
  eventType: EventType;
  eventTag: EventTag;
  eventId: string;
  count: number;
};

export async function buildCourierDiscordUserRequest({
  requestKey,
  subscriberChannel,
  template,
  service,
  eventType,
  eventTag,
  eventId,
  count,
}: BuildNotificationMessageParams): Promise<SendMessageRequest> {
  log.info(
    `Building Discord request for subscriber channel ${subscriberChannel.id} for event ${eventId}.`
  );

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
        discord: { [requestKey]: subscriberChannel.recipient },
      },
      template: template.templateId,
      data: compiledData,
    },
  };
}

export async function buildCourierRequest({
  requestKey,
  subscriberChannel,
  template,
  service,
  eventType,
  eventTag,
  eventId,
  count,
}: BuildNotificationMessageParams): Promise<SendMessageRequest> {
  log.info(
    `Building Courier request for subscriber channel ${subscriberChannel.id} for event ${eventId}.`
  );

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
        [requestKey]: subscriberChannel.recipient,
      },
      template: template.templateId,
      data: compiledData,
    },
  };
}
