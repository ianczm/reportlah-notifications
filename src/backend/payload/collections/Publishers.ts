import type { CollectionConfig } from "payload";

export const Publishers: CollectionConfig = {
  slug: "publishers",
  admin: {
    group: "System",
  },
  fields: [
    {
      name: "service",
      type: "relationship",
      relationTo: "services",
      required: true,
    },
    {
      name: "tenant",
      type: "relationship",
      relationTo: "tenants",
      required: true,
    },
    {
      name: "supported-event-tags",
      type: "relationship",
      relationTo: "event-tags",
      hasMany: true,
    },
    {
      name: "supported-event-types",
      type: "relationship",
      relationTo: "event-types",
      hasMany: true,
    },
    {
      name: "subscriptions",
      type: "join",
      collection: "subscriptions",
      on: "publisher",
    },
  ],
};
