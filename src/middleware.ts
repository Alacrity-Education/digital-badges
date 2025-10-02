export { auth as middleware } from "@/app/auth";
export const config = {
  matcher: ["/badges/:path*", "/onboarding/:path*", "/recipients/:path*"],
};
