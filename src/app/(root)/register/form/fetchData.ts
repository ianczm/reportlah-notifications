import _ from "lodash";

import payload from "@/backend/payload/payload";

export async function getChannels() {
  const channels = await payload.find({
    collection: "channels",
    depth: 0,
  });

  return _(channels.docs)
    .groupBy((channel) => channel.provider)
    .map((channels, channelName) => ({ channelName, channels }))
    .value();
}
