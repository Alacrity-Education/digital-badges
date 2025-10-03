import { getAssertionByUUID } from "@/app/assertions/actions";
import type { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/assertions/[uid]">
) {
  const { uid } = await ctx.params;

  const assertion = await getAssertionByUUID(uid);
  //make all fields string. create new assertion
  const stringifiedAssertion = Object.fromEntries(
    Object.entries(assertion)
      .filter(([key]) => key !== "id")
      .map(([key, value]) =>
        key === "issuedOn"
          ? [key, value]
          : [key, value != null ? String(value) : ""]
      )
  );

  return Response.json(stringifiedAssertion);
}
