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

  const badgeWithIssuerUrl = {
    ...badge,
    issuer: issuer?.engineUrl + "/api/issuer",
  };

  //stringify all fields in badgeWithIssuerUrl
  const stringifiedBadge = Object.fromEntries(
    Object.entries(badgeWithIssuerUrl).map(([key, value]) =>
      key === "issuedOn"
        ? [key, value]
        : [key, value != null ? String(value) : ""]
    )
  );

  return Response.json(stringifiedBadge);
}
