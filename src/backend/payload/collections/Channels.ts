import { uuidField } from "../fields/fields";
import { uuidBeforeValidate } from "../hooks/uuidBeforeValidate";

import type { CollectionConfig } from "payload";

export const Channels: CollectionConfig = {
  slug: "channels",
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
