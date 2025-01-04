import type { CollectionConfig } from "payload";

export const Subscriptions: CollectionConfig = {
  slug: "subscriptions",
  admin: {
    group: "System",
  },
  fields: [
    {
      name: "publisher",
      type: "relationship",
      relationTo: "publishers",
      required: true,
    },
    {
      name: "subscriber",
      type: "relationship",
      relationTo: "subscribers",
      required: true,
    },
  ],
};
