import { NextRequest, NextResponse } from "next/server";

import { HEADERS } from "./constants";

export async function middleware(request: NextRequest) {
  const requestPath = request.nextUrl.origin;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(HEADERS.keys.nextUrlOrigin, requestPath);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
