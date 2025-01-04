import { uuidField } from "../fields/fields";
import { uuidBeforeValidate } from "../hooks/uuidBeforeValidate";

import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    group: "Core",
  },
  auth: true,
  hooks: {
    beforeValidate: [uuidBeforeValidate],
  },
  fields: [uuidField],
};
