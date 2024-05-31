import { NextResponse } from "next/server";

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function middleware(request: Request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
