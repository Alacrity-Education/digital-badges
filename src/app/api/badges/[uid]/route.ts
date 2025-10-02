import { getBadgeByUUID } from "@/app/badges/actions";
import { getIssuer } from "@/app/onboarding/actions";
import type { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/badges/[uid]">
) {
  const { uid } = await ctx.params;
  const badge = await getBadgeByUUID(uid);
  const issuer = await getIssuer();
  return Response.json({
    ...badge,
    issuer: issuer?.engineUrl + "/api/issuer",
  });
}
