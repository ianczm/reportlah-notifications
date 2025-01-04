import { uuidField } from "../fields/fields";
import { uuidBeforeValidate } from "../hooks/uuidBeforeValidate";

import type { CollectionConfig } from "payload";

export const Templates: CollectionConfig = {
  slug: "templates",
  admin: {
    useAsTitle: "name",
    group: "Notifications",
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
      name: "template_body",
      type: "textarea",
      required: true,
    },
    {
      name: "channel",
      type: "relationship",
      relationTo: "channels",
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
