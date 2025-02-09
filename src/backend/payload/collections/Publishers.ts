import { getId } from "@/backend/utils/payload";

import type { CollectionConfig } from "payload";

export const Publishers: CollectionConfig = {
  slug: "publishers",
  admin: {
    group: "System",
    useAsTitle: "name",
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
            const tenant = await req.payload.findByID({
              collection: "tenants",
              id: getId(data!.tenant),
            });

            const service = await req.payload.findByID({
              collection: "services",
              id: getId(data!.service),
            });

            return `${service.name} | ${tenant.name}`;
          },
        ],
      },
    },
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
