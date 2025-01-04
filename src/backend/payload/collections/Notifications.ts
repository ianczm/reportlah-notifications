import { uuidField } from "../fields/fields";
import { uuidBeforeValidate } from "../hooks/uuidBeforeValidate";

import type { CollectionConfig } from "payload";

export const Notifications: CollectionConfig = {
  slug: "notifications",
  admin: {
    group: "Notifications",
  },
  hooks: {
    beforeValidate: [uuidBeforeValidate],
  },
  fields: [
    uuidField,
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
    },
    {
      name: "subscription",
      type: "relationship",
      relationTo: "subscriptions",
      required: true,
    },
    {
      name: "subscriber-channel",
      type: "relationship",
      relationTo: "subscriber-channels",
      required: true,
    },
    {
      name: "body",
      type: "textarea",
      required: true,
    },
  ],
};
