import { auth } from "@/app/auth";
import { ADMIN_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT } from "./route";
import { NextResponse } from "next/server";

export default auth(req => {
  const { nextUrl } = req;
  const auth = req?.auth;
  const isLoggedIn = !!auth && !!auth?.user;
  const role = auth && auth?.user?.role;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (role === "admin") {
        return Response.redirect(new URL(ADMIN_LOGIN_REDIRECT, nextUrl));
      }
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && isAdminRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)"
  ]
};
