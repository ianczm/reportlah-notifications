import { createSafeActionClient } from "next-safe-action";

import { ActionError } from "@/backend/actions/errors";

import { log } from "./winston";

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    log.error(`Server action failed: ${error.message}`, { error });
    if (error instanceof ActionError) {
      return error.message;
    }
    return "Something went wrong.";
  },
});
