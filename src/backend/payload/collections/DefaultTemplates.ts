import { getId } from "@/backend/utils/payload";

import type { CollectionConfig } from "payload";

export const DefaultTemplates: CollectionConfig = {
  slug: "default-templates",
  admin: {
    useAsTitle: "name",
    group: "Notifications",
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
          async ({ data, req }) => {
            const channel = await req.payload.findByID({
              collection: "channels",
              id: getId(data!.channel),
              depth: 0,
            });
            return channel.name;
          },
        ],
      },
    },
    {
      name: "data",
      type: "json",
      required: true,
    },
    {
      name: "channel",
      type: "relationship",
      relationTo: "channels",
      required: true,
      unique: true,
    },
  ],
};
