import type { CollectionConfig } from "payload";

export const SubscriberChannels: CollectionConfig = {
  slug: "subscriber-channels",
  admin: {
    group: "System",
  },
  fields: [
    {
      name: "subscriber",
      type: "relationship",
      relationTo: "subscribers",
      required: true,
    },
    {
      name: "channel",
      type: "relationship",
      relationTo: "channels",
      required: true,
    },
    {
      name: "recipient",
      type: "text",
      required: true,
    },
  ],
};
