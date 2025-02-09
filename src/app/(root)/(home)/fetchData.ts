import _ from "lodash";

import payload from "@/backend/payload/payload";
import { Service } from "@/backend/payload/payload-types";

export async function getAllPublisherGroups() {
  const publishers = await payload.find({
    collection: "publishers",
    limit: 5,
    depth: 1,
    sort: "-createdAt",
  });
  return _(publishers.docs)
    .groupBy((publisher) => {
      const service = publisher.service as Service;
      return service.name;
    })
    .map((publishers, serviceName) => ({ serviceName, publishers }))
    .value();
}
