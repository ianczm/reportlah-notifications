import { uuidField } from "../fields/fields";
import { uuidBeforeValidate } from "../hooks/uuidBeforeValidate";

import type { CollectionConfig } from "payload";

export const Subscriptions: CollectionConfig = {
  slug: "subscriptions",
  hooks: {
    beforeValidate: [uuidBeforeValidate],
  },
  fields: [
    uuidField,
    {
      name: "publisher",
      type: "relationship",
      relationTo: "publishers",
      required: true,
    },
    {
      name: "subscriber",
      type: "relationship",
      relationTo: "subscribers",
      required: true,
    },
  ],
};
