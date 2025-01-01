import { uuidBeforeValidate } from "../hooks/uuidBeforeValidate";

import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  hooks: {
    beforeValidate: [uuidBeforeValidate],
  },
  fields: [
    {
      name: "id",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
  ],
};
