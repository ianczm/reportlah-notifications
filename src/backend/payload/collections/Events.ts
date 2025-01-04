import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    group: "Events",
  },
  fields: [
    {
      name: "publisher",
      type: "relationship",
      relationTo: "publishers",
      required: true,
    },
    {
      name: "type",
      type: "relationship",
      relationTo: "event-types",
      required: true,
    },
    {
      name: "tag",
      type: "relationship",
      relationTo: "event-tags",
      required: true,
    },
  ],
};
