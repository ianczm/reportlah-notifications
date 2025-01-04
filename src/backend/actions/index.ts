"use server";

import payload from "../payload/payload";
import { Publisher } from "../payload/payload-types";

export async function getAllPublishers(): Promise<Publisher[]> {
  const publishers = await payload.find({
    collection: "publishers",
    limit: 5,
    depth: 5,
  });
  return publishers.docs;
}
