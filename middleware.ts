import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { UserInfo } from "./types/userTypes";

const publicPages = [
  "/login",
  "/login/google",
  "/forgot-password",
  "/forgot-password/email-sent",
  "/sign-up",
  "/sign-up/email-sent",
  "/verify",
  "/reset-password",
  "/reset-password/success",
  "/privacy-policy",
  "/terms-of-service",
  "/certificates/[id]",
  "/sentry-example-page",
];
const dynamicPublicPages = ["/lesson"];
const backofficePages = ["/backoffice"];
const adminPages = ["/admin"];

const authMiddleware = (request: NextRequest): NextResponse | undefined => {
  const token = request.cookies.get("token")?.value;

  const loginUrl = new URL("/login", request.url);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const decodedToken = jwt.decode(token) as { expiresAt: number; user: UserInfo } | null;

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

    if (backofficePages.some((path) => request.nextUrl.pathname.startsWith(path))) {
      if (decodedToken.user.isAdmin || decodedToken.user.teams?.length) {
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
  const isPublicPage =
    publicPages.some((path) => {
      if (path.includes("[id]")) {
        const regex = new RegExp(path.replace("[id]", "[^/]+"));
        return regex.test(pathname);
      }
      return path === pathname;
    }) || dynamicPublicPages.some((path) => pathname.startsWith(path));

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
