import { getIssuer } from "@/app/onboarding/actions";
import type { NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  return Response.json(await getIssuer());
}
