import type { CollectionConfig } from "payload";

export const Channels: CollectionConfig = {
  slug: "channels",
  admin: {
    useAsTitle: "name",
    group: "Core",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};
