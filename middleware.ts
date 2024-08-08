import { NextResponse } from "next/server";

// NOTE test middleware just to protect all routes, set to true to run unauthenticated
const isLoggedIn: boolean = false;

export const middleware = (request: Request) => {
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/"],
};
