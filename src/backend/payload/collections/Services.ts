import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
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
