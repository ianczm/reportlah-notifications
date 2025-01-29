import type { CollectionConfig } from "payload";

export const Subscribers: CollectionConfig = {
  slug: "subscribers",
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
              id: data!.tenant.id ?? data!.tenant,
            });

            const user = await req.payload.findByID({
              collection: "users",
              id: data!.user.id ?? data!.user,
            });

            return `${user.email} | ${tenant.name}`;
          },
        ],
      },
    },
    {
      name: "tenant",
      type: "relationship",
      relationTo: "tenants",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "subscriberChannels",
      type: "join",
      collection: "subscriber-channels",
      on: "subscriber",
    },
    {
      name: "subscriptions",
      type: "join",
      collection: "subscriptions",
      on: "subscriber",
    },
  ],
};
