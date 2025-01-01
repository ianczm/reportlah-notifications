import { uuidField } from "../fields/fields";
import { uuidBeforeValidate } from "../hooks/uuidBeforeValidate";

import type { CollectionConfig } from "payload";

export const EventTags: CollectionConfig = {
  slug: "event-tags",
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
    {
      name: "event_type",
      type: "relationship",
      relationTo: "event-types",
      required: true,
    },
  ],
};
