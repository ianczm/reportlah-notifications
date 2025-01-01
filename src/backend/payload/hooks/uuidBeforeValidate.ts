import { BeforeValidateHook } from "node_modules/payload/dist/collections/config/types";
import { v4 as uuid } from "uuid";

export const uuidBeforeValidate: BeforeValidateHook = ({ data, operation }) => {
  if (operation === "create") {
    if (!data?.id) {
      return { ...data, id: uuid() };
    }
  }
  return { data };
};
