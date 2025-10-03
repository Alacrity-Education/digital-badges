import { getIssuer } from "@/app/onboarding/actions";

export async function GET() {
  const issuer = await getIssuer();
  if (!issuer) {
    return new Response("Issuer not found", { status: 404 });
  }
  const stringifiedIssuer = Object.fromEntries(
    Object.entries(issuer)
      .filter(([key]) => key !== "id")
      .map(([key, value]) => [key, value != null ? String(value) : ""])
  );
  return Response.json(stringifiedIssuer);
}
