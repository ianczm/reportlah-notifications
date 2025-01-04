import { uuidField } from "../fields/fields";
import { uuidBeforeValidate } from "../hooks/uuidBeforeValidate";

import type { CollectionConfig } from "payload";

export const NotificationBatches: CollectionConfig = {
  slug: "notification-batches",
  admin: {
    group: "Notifications",
  },
  hooks: {
    beforeValidate: [uuidBeforeValidate],
  },
  fields: [
    uuidField,
    {
      name: "notifications",
      type: "relationship",
      relationTo: "notifications",
      hasMany: true,
    },
  ],
};
