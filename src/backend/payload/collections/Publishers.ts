import { uuidField } from "../fields/fields";
import { uuidBeforeValidate } from "../hooks/uuidBeforeValidate";

import type { CollectionConfig } from "payload";

export const Publishers: CollectionConfig = {
  slug: "publishers",
  hooks: {
    beforeValidate: [uuidBeforeValidate],
  },
  fields: [
    uuidField,
    {
      name: "service",
      type: "relationship",
      relationTo: "services",
      required: true,
    },
    {
      name: "tenant",
      type: "relationship",
      relationTo: "tenants",
      required: true,
    },
    {
      name: "supported_event_tags",
      type: "relationship",
      relationTo: "event-tags",
      hasMany: true,
    },
    {
      name: "supported_event_types",
      type: "relationship",
      relationTo: "event-types",
      hasMany: true,
    },
  ],
};
