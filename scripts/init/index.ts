import payload from "@/backend/payload/payload";
import { User } from "@/backend/payload/payload-types";

import { seedDefaultTemplates } from "./default-templates";

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
  await Promise.all([
    createAdminUserIfNotExists(),
    payload.create({
      collection: "channels",
      data: {
        provider: "Courier",
        recipientType: "Default",
      },
    }),
    payload.create({
      collection: "channels",
      data: {
        provider: "Discord",
        recipientType: "User",
      },
    }),
    payload.create({
      collection: "channels",
      data: {
        provider: "Discord",
        recipientType: "Channel",
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

  await Promise.all([
    payload.create({
      collection: "event-tags",
      data: {
        name: "Dish Washing",
        "event-type": feedbackEventType.id,
        service: foodService.id,
      },
    }),
    payload.create({
      collection: "event-tags",
      data: {
        name: "Test Tag",
        "event-type": feedbackEventType.id,
        service: foodService.id,
      },
    }),
    payload.create({
      collection: "event-tags",
      data: {
        name: "Temperature Control",
        "event-type": feedbackEventType.id,
        service: foodService.id,
      },
    }),
    payload.create({
      collection: "event-tags",
      data: {
        name: "Bad Service",
        "event-type": reportEventType.id,
        service: foodService.id,
      },
    }),
  ]);

  await seedDefaultTemplates();
};

await seed();
process.exit(0);
