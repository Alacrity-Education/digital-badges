import { getIssuer } from "@/app/onboarding/actions";

export async function GET() {
  return Response.json(await getIssuer());
}
