import type { CollectionConfig } from "payload";

export const NotificationBatches: CollectionConfig = {
  slug: "notification-batches",
  admin: {
    group: "Notifications",
  },
  fields: [
    {
      name: "notifications",
      type: "relationship",
      relationTo: "notifications",
      hasMany: true,
    },
  ],
};
