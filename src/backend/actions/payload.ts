"use server";

import { actionClient } from "@/lib/safe-action";

import payload from "../payload/payload";
import { Publisher } from "../payload/payload-types";

async function getAllPublishers(): Promise<Publisher[]> {
  const publishers = await payload.find({
    collection: "publishers",
    limit: 5,
    depth: 5,
  });
  return publishers.docs;
}

export const getAllPublishersAction = actionClient.action(getAllPublishers);
