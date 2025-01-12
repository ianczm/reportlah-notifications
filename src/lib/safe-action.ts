import { createSafeActionClient } from "next-safe-action";

import { ActionError } from "@/backend/actions/errors";

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof ActionError) {
      return error.message;
    }
    return "Something went wrong.";
  },
});
