import payload from "@/backend/payload/payload";
import { Publisher } from "@/backend/payload/payload-types";

export async function getAllPublishers(): Promise<Publisher[]> {
  const publishers = await payload.find({
    collection: "publishers",
    limit: 5,
    depth: 1,
  });
  return publishers.docs;
}
