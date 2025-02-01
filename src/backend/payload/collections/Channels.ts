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
      admin: {
        readOnly: true,
        hidden: true,
      },
      hooks: {
        beforeChange: [
          async ({ siblingData }) => {
            delete siblingData["name"];
          },
        ],
        afterRead: [
          async ({ data }) => {
            return `${data!.provider} | ${data!.recipientType}`;
          },
        ],
      },
    },
    {
      name: "provider",
      type: "text",
      required: true,
    },
    {
      name: "recipientType",
      type: "text",
      required: true,
    },
  ],
};
