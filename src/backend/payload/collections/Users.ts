import { v4 as uuid } from "uuid";

import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === "create") {
          if (!data?.id) {
            return { ...data, id: uuid() };
          }
        }
        return { data };
      },
    ],
  },
  fields: [
    {
      name: "id",
      type: "text",
    },
    // Email added by default
    // Add more fields as needed
  ],
};
