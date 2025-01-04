import { uuidField } from "../fields/fields";
import { uuidBeforeValidate } from "../hooks/uuidBeforeValidate";

import type { CollectionConfig } from "payload";

export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  admin: {
    group: "System",
  },
  hooks: {
    beforeValidate: [uuidBeforeValidate],
  },
  fields: [
    uuidField,
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
  ],
};
