import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  isAdmin: boolean;
}

const publicPages = ["/login", "/login/google", "/forgot-password", "/sign-up", "/reset-password"];
const dynamicPublicPages = ["/lesson"];
const adminPages = ["/backoffice"];

const authMiddleware = (request: NextRequest): NextResponse | undefined => {
  const token = request.cookies.get("token")?.value;

  const loginUrl = new URL("/login", request.url);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const decodedToken = jwt.decode(token) as { expiresAt: number; user: User } | null;

    if (!decodedToken || !decodedToken.expiresAt) {
      Cookies.remove("token");
      return NextResponse.redirect(loginUrl);
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.expiresAt < currentTime) {
      Cookies.remove("token");
      return NextResponse.redirect(loginUrl);
    }

    if (adminPages.some((path) => request.nextUrl.pathname.startsWith(path))) {
      if (decodedToken.user.isAdmin) {
        return NextResponse.next();
      }
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(loginUrl);
  }
};

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublicPage = publicPages.includes(pathname) || dynamicPublicPages.some((path) => pathname.startsWith(path));

  if (isPublicPage) {
    return;
  }

  return authMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|public|icons|manifest|assets).*)",
  ],
};
