import { uuidField } from "../fields/fields";
import { uuidBeforeValidate } from "../hooks/uuidBeforeValidate";

import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  hooks: {
    beforeValidate: [uuidBeforeValidate],
  },
  fields: [
    uuidField,
    {
      name: "type",
      type: "relationship",
      relationTo: "event-types",
      required: true,
    },
    {
      name: "tag",
      type: "relationship",
      relationTo: "event-tags",
      required: true,
    },
    {
      name: "publisher",
      type: "relationship",
      relationTo: "publishers",
      required: true,
    },
  ],
};
