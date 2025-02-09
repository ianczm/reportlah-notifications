import type { CollectionConfig } from "payload";

export const Notifications: CollectionConfig = {
  slug: "notifications",
  admin: {
    group: "Notifications",
  },
  fields: [
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
    },
    {
      name: "subscription",
      type: "relationship",
      relationTo: "subscriptions",
      required: true,
    },
    {
      name: "subscriber-channel",
      type: "relationship",
      relationTo: "subscriber-channels",
      required: true,
    },
    {
      name: "body",
      type: "json",
    },
    {
      name: "response",
      type: "json",
    },
  ],
};
