import { auth } from "@/app/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/badges", "/onboarding", "/recipients"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const session = await auth();
    if (!session) {
      const signInUrl = new URL("/api/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}
