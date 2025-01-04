import payload from "@/backend/payload/payload";

const seed = async () => {
  const [user, tenant, channel] = await Promise.all([
    payload.create({
      collection: "users",
      data: {
        email: "johndoe@email.com",
        password: "reportlah",
      },
    }),
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

  const eventType = await payload.create({
    collection: "event-types",
    data: {
      name: "Feedback",
      slug: "feedback",
    },
  });

  const [dishWashingTag, temperatureControlTag] = await Promise.all([
    payload.create({
      collection: "event-tags",
      data: {
        name: "Dish Washing",
        "event-type": eventType.id,
      },
    }),
    payload.create({
      collection: "event-tags",
      data: {
        name: "Temperature Control",
        "event-type": eventType.id,
      },
    }),
  ]);

  const [publisher, subscriber] = await Promise.all([
    payload.create({
      collection: "publishers",
      data: {
        service: foodService.id,
        tenant: tenant.id,
        "supported-event-types": [eventType.id],
        "supported-event-tags": [dishWashingTag.id, temperatureControlTag.id],
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
        channel: channel.id,
        value: "ianczm",
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
        name: "Shin Kee | Courier Feedback",
        channel: channel.id,
        publisher: publisher.id,
        data: {
          templateId: "SAKXNG0H1M45GDMT9W6NTEQ7XCMY",
          templateBody:
            "You have received {{eventType}} for {{service}}: {{eventTag}}!",
        },
      },
    }),
  ]);
};

await seed();
