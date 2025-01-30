import type { CollectionConfig } from "payload";

export const EventTags: CollectionConfig = {
  slug: "event-tags",
  admin: {
    useAsTitle: "name",
    group: "Events",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "service",
      type: "relationship",
      relationTo: "services",
      required: false,
    },
    {
      name: "event-type",
      type: "relationship",
      relationTo: "event-types",
      required: true,
    },
  ],
};
