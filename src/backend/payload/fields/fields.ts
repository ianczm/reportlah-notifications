import type { Field } from "payload";

export const uuidField: Field = {
  name: "id",
  type: "text",
  admin: {
    readOnly: true,
  },
  unique: true,
};
