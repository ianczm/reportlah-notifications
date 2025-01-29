import payload from "@/backend/payload/payload";
import { User } from "@/backend/payload/payload-types";

async function createAdminUserIfNotExists(): Promise<User> {
  const foundUser = await payload.find({
    collection: "users",
    where: {
      email: {
        equals: "admin@reportlah.com",
      },
    },
  });

  if (foundUser.docs.length !== 0) {
    return foundUser.docs[0];
  }

  console.log("Creating admin user...");
  return await payload.create({
    collection: "users",
    data: {
      email: "admin@reportlah.com",
      password: "reportlah",
    },
  });
}

const seed = async () => {
  const [user, tenant, courierChannel, discordChannel] = await Promise.all([
    createAdminUserIfNotExists(),
    payload.create({
      collection: "tenants",
      data: {
        name: "Shin Kee Beef Noodles",
        slug: "shin-kee",
      },
    }),
    payload.create({
      collection: "channels",
      data: {
        name: "Courier",
      },
    }),
    payload.create({
      collection: "channels",
      data: {
        name: "Discord",
      },
    }),
  ]);

  const [foodService] = await Promise.all([
    payload.create({
      collection: "services",
      data: {
        name: "ReportLah Food",
        slug: "food",
      },
    }),
    payload.create({
      collection: "services",
      data: {
        name: "ReportLah Washrooms",
        slug: "washrooms",
      },
    }),
  ]);

  const [feedbackEventType, reportEventType] = await Promise.all([
    payload.create({
      collection: "event-types",
      data: {
        name: "Feedback",
        slug: "feedback",
      },
    }),
    payload.create({
      collection: "event-types",
      data: {
        name: "Report",
        slug: "report",
      },
    }),
  ]);

  const [dishWashingTag, temperatureControlTag, badServiceTag] =
    await Promise.all([
      payload.create({
        collection: "event-tags",
        data: {
          name: "Dish Washing",
          "event-type": feedbackEventType.id,
        },
      }),
      payload.create({
        collection: "event-tags",
        data: {
          name: "Temperature Control",
          "event-type": feedbackEventType.id,
        },
      }),
      payload.create({
        collection: "event-tags",
        data: {
          name: "Bad Service",
          "event-type": reportEventType.id,
        },
      }),
    ]);

  const [publisher, subscriber] = await Promise.all([
    payload.create({
      collection: "publishers",
      data: {
        service: foodService.id,
        tenant: tenant.id,
        "supported-event-types": [feedbackEventType.id, reportEventType.id],
        "supported-event-tags": [
          dishWashingTag.id,
          temperatureControlTag.id,
          badServiceTag.id,
        ],
      },
    }),
    payload.create({
      collection: "subscribers",
      data: {
        user: user.id,
        tenant: tenant.id,
      },
    }),
  ]);

  await Promise.all([
    payload.create({
      collection: "subscriber-channels",
      data: {
        subscriber: subscriber.id,
        channel: courierChannel.id,
        recipient: "ianczm",
        enabled: false,
      },
    }),
    payload.create({
      collection: "subscriber-channels",
      data: {
        subscriber: subscriber.id,
        channel: discordChannel.id,
        recipient: "236710198465527809",
        enabled: true,
      },
    }),
    payload.create({
      collection: "subscriptions",
      data: {
        publisher: publisher.id,
        subscriber: subscriber.id,
      },
    }),
    payload.create({
      collection: "templates",
      data: {
        name: "Shin Kee | Discord Feedback",
        channel: discordChannel.id,
        publisher: publisher.id,
        data: {
          templateId: "SAKXNG0H1M45GDMT9W6NTEQ7XCMY",
          templateData: {
            body: "Hey from Discord! You have received {{count}} count(s) of [{{eventTypeName}}] {{eventTagName}}.",
            title: "[{{serviceName}}] {{eventTypeName}} Received",
          },
        },
      },
    }),
    payload.create({
      collection: "templates",
      data: {
        name: "Shin Kee | Courier Feedback",
        channel: courierChannel.id,
        publisher: publisher.id,
        data: {
          templateId: "SAKXNG0H1M45GDMT9W6NTEQ7XCMY",
          templateData: {
            body: "You have received {{count}} count(s) of [{{eventTypeName}}] {{eventTagName}}.",
            title: "[{{serviceName}}] {{eventTypeName}} Received",
          },
        },
      },
    }),
  ]);
};

await seed();
process.exit(0);
