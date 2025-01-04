import type { CollectionConfig } from "payload";

export const Templates: CollectionConfig = {
  slug: "templates",
  admin: {
    useAsTitle: "name",
    group: "Notifications",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "template-body",
      type: "textarea",
      required: true,
    },
    {
      name: "channel",
      type: "relationship",
      relationTo: "channels",
      required: true,
    },
    {
      name: "publisher",
      type: "relationship",
      relationTo: "publishers",
      required: true,
    },
  ],
};
