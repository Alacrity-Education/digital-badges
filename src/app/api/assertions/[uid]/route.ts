import { getAssertionByUUID } from "@/app/assertions/actions";
import type { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/assertions/[uid]">
) {
  const { uid } = await ctx.params;
  return Response.json(await getAssertionByUUID(uid));
}
