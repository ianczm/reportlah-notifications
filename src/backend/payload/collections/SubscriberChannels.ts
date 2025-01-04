import { uuidField } from "../fields/fields";
import { uuidBeforeValidate } from "../hooks/uuidBeforeValidate";

import type { CollectionConfig } from "payload";

export const SubscriberChannels: CollectionConfig = {
  slug: "subscriber-channels",
  admin: {
    group: "System",
  },
  hooks: {
    beforeValidate: [uuidBeforeValidate],
  },
  fields: [
    uuidField,
    {
      name: "subscriber",
      type: "relationship",
      relationTo: "subscribers",
      required: true,
    },
    {
      name: "channel",
      type: "relationship",
      relationTo: "channels",
      required: true,
    },
    {
      name: "value",
      type: "text",
      required: true,
    },
  ],
};
