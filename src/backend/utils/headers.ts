import { headers } from "next/headers";

import { HEADERS } from "@/constants";

export async function getOrigin() {
  const requestHeaders = await headers();
  return requestHeaders.get(HEADERS.keys.nextUrlOrigin);
}
