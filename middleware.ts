import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const publicPages = ["/login", "/forgot-password", "/sign-up", "/reset-password"];

const authMiddleware = (request: NextRequest): NextResponse | undefined => {
  const token = request.cookies.get("token")?.value;

  const loginUrl = new URL("/login", request.url);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const decodedToken = jwt.decode(token) as { expiresAt: number } | null;

    if (!decodedToken || !decodedToken.expiresAt) {
      return NextResponse.redirect(loginUrl);
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.expiresAt < currentTime) {
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(loginUrl);
  }
};

export default function middleware(req: NextRequest) {
  const isPublicPage = publicPages.includes(req.nextUrl.pathname);

  if (isPublicPage) {
    return;
  }

  return authMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|public|icons|manifest|assets).*)",
  ],
};
