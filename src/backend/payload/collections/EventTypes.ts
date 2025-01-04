import type { CollectionConfig } from "payload";

export const EventTypes: CollectionConfig = {
  slug: "event-types",
  admin: {
    useAsTitle: "name",
    group: "Events",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
  ],
};
