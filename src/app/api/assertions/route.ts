import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { badgeAssertions, badgeClasses, issuers, recipients } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uuid = searchParams.get("uuid");

  if (!uuid) {
    return NextResponse.json({ ok: false, error: "Missing uuid" }, { status: 400 });
  }

  const rows = await db
    .select({
      assertion: badgeAssertions,
      badge: badgeClasses,
      issuer: issuers,
      recipient: recipients,
    })
    .from(badgeAssertions)
    .leftJoin(badgeClasses, eq(badgeAssertions.badgeId, badgeClasses.id))
    .leftJoin(issuers, eq(badgeClasses.issuerId, issuers.id))
    .leftJoin(recipients, eq(badgeAssertions.recipientId, recipients.id))
    .where(eq(badgeAssertions.uuid, uuid))
    .limit(1);

  if (rows.length === 0) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

  const { assertion: a, badge, issuer, recipient } = rows[0];

  const result = {
    uid: a.uuid,
    recipient: {
      identity: recipient?.identity ?? null,
      type: recipient?.type ?? "email",
      hashed: (recipient?.hashed ?? "false") === "true",
    },
    issuedOn: a.issuedOn,
    badge: {
      name: badge?.name ?? null,
      description: badge?.description ?? null,
      image: badge?.image ?? null,
      criteria: badge?.criteria ?? null,
      issuer: issuer
        ? { name: issuer.name, url: issuer.url }
        : null,
    },
    image: a.image ?? null,
    verify: {
      type: "hosted",
      url: `/api/assertion?uuid=${a.uuid}`,
    },
  };

  return NextResponse.json(result);
}
