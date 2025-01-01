import { uuidField } from "../fields/fields";
import { uuidBeforeValidate } from "../hooks/uuidBeforeValidate";

import type { CollectionConfig } from "payload";

export const EventTypes: CollectionConfig = {
  slug: "event-types",
  admin: {
    useAsTitle: "name",
  },
  hooks: {
    beforeValidate: [uuidBeforeValidate],
  },
  fields: [
    uuidField,
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};
