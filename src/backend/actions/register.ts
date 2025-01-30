"use server";

import { redirect } from "next/navigation";

import { actionClient } from "@/lib/safe-action";
import { log } from "@/lib/winston";
import {
  REGISTRATION_FORM_SCHEMA,
  RegistrationFormSchema,
} from "@/ui/features/register/validator";

import payload from "../payload/payload";
import {
  Publisher,
  Subscriber,
  SubscriberChannel,
  Subscription,
  Tenant,
  User,
} from "../payload/payload-types";

async function register(request: RegistrationFormSchema) {
  // Todo: check if email already exists
  log.info("Registration request received.", { request });

  const tenant = await createTenant(request.tenantName, request.location);
  const publishers = await createPublishers(tenant.id);

  const user = await createUser(request.email, request.password);
  const subscriber = await createSubscriber(user.id, tenant.id);

  const subscriberChannel = await createSubscriberChannel(
    subscriber.id,
    request.channelId,
    request.recipient
  );

  const publisherIds = publishers.map((publisher) => publisher.id);
  const subscriptions = await createSubscriptions(subscriber.id, publisherIds);

  await notifyRegistration({
    tenant,
    publishers,
    user,
    subscriber,
    subscriberChannel,
    subscriptions,
  });

  /* Currently only registers a publisher for Reportlah Food */
  redirect(`/register/success?publisherId=${publisherIds[0]}`);
}

async function createTenant(
  name: string,
  location: { longtitude: number; latitude: number }
): Promise<Tenant> {
  const tenant = await payload.create({
    collection: "tenants",
    data: {
      name,
    },
  });

  await payload.create({
    collection: "tenantMetadata",
    data: {
      tenant: tenant.id,
      location: [location.longtitude, location.latitude],
    },
  });

  log.info(`Created tenant: ${tenant.id}`);
  return tenant;
}

async function createPublishers(tenantId: string): Promise<Publisher[]> {
  const services = await payload.find({
    collection: "services",
    where: {
      slug: {
        equals: "food",
      },
    },
    depth: 0,
  });

  log.info("Retrieved services.", { services });

  const [eventTypes, eventTags] = await Promise.all([
    payload.find({
      collection: "event-types",
      depth: 0,
    }),
    payload.find({
      collection: "event-tags",
      depth: 0,
    }),
  ]);

  log.info("Retrieved eventTags.", { eventTags });
  log.info("Retrieved eventTypes.", { eventTypes });

  const publishers = services.docs.map(async (service) => {
    const publisher = await payload.create({
      collection: "publishers",
      data: {
        service: service.id,
        tenant: tenantId,
        "supported-event-types": eventTypes.docs.map((type) => type.id),
        "supported-event-tags": eventTags.docs
          .filter((tag) => tag.service === service.id)
          .map((tag) => tag.id),
      },
    });

    log.info(`Created publisher: ${publisher.id}`);
    return publisher;
  });

  return Promise.all(publishers);
}

async function createUser(email: string, password: string): Promise<User> {
  const user = await payload.create({
    collection: "users",
    data: {
      email,
      password,
    },
  });

  log.info(`Created user: ${user.id} for email ${user.email}`);
  return user;
}

async function createSubscriber(
  userId: string,
  tenantId: string
): Promise<Subscriber> {
  const subscriber = await payload.create({
    collection: "subscribers",
    data: {
      user: userId,
      tenant: tenantId,
    },
  });

  log.info(`Created subscriber ${subscriber.id}`);
  return subscriber;
}

async function createSubscriberChannel(
  subscriberId: string,
  channelId: string,
  recipient: string
): Promise<SubscriberChannel> {
  log.info("About to create subscriber channel.", {
    subscriberId,
    channelId,
    recipient,
  });

  const subscriberChannel = await payload.create({
    collection: "subscriber-channels",
    data: {
      subscriber: subscriberId,
      channel: channelId,
      recipient,
      enabled: true,
    },
  });

  log.info(
    `Created subscriber channel ${subscriberChannel.id} for subscriber ${subscriberId} and channel ${channelId}`
  );

  return subscriberChannel;
}

async function createSubscriptions(
  subscriberId: string,
  publisherIds: string[]
): Promise<Subscription[]> {
  log.info("About to create subscriptions.", {
    subscriberId,
    publisherIds,
  });

  const subscriptions = publisherIds.map(async (publisherId) => {
    const subscription = await payload.create({
      collection: "subscriptions",
      data: {
        publisher: publisherId,
        subscriber: subscriberId,
      },
    });

    log.info(
      `Created subscription ${subscription.id} for publisher ${publisherId}`
    );
    return subscription;
  });

  return Promise.all(subscriptions);
}

async function notifyRegistration(resources: {
  tenant: Tenant;
  publishers: Publisher[];
  user: User;
  subscriber: Subscriber;
  subscriberChannel: SubscriberChannel;
  subscriptions: Subscription[];
}): Promise<void> {
  log.info("Registration complete, resources created.", { resources });
}

export const registerAction = actionClient
  .schema(REGISTRATION_FORM_SCHEMA)
  .action(async ({ parsedInput }) => register(parsedInput));
