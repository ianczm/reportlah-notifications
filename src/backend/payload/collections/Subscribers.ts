import type { CollectionConfig } from "payload";

export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  admin: {
    group: "System",
  },
  fields: [
    {
      name: "tenant",
      type: "relationship",
      relationTo: "tenants",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
  ],
};
