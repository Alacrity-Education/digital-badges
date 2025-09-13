"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/client";
import { badgeAssertions } from "@/db/schema";
import { eq } from "drizzle-orm";

/** Assign a badge to a user (CREATE assertion) */
export async function createAssertion(formData: FormData): Promise<void> {
  const badgeId = Number(formData.get("badgeId"));
  const recipientId = Number(formData.get("recipientId"));
  const image = String(formData.get("image") ?? "").trim();

  if (!badgeId || !recipientId) return;

  await db.insert(badgeAssertions).values({
    badgeId,
    recipientId,
    image: image || null,
    // issuedOn defaults to now (from schema)
  });

  revalidatePath("/assertions");
}

/** Update an awarded badge (UPDATE assertion) */
export async function updateAssertion(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!id) return;

  const maybeBadgeId = formData.get("badgeId");
  const maybeRecipientId = formData.get("recipientId");
  const maybeImage = formData.get("image");

  const updates: Record<string, unknown> = {};
  if (maybeBadgeId) updates.badgeId = Number(maybeBadgeId);
  if (maybeRecipientId) updates.recipientId = Number(maybeRecipientId);
  if (typeof maybeImage === "string") updates.image = maybeImage.trim();

  if (Object.keys(updates).length === 0) return;

  await db.update(badgeAssertions).set(updates).where(eq(badgeAssertions.id, id));
  revalidatePath("/assertions");
}

/** Revoke an awarded badge (DELETE assertion) */
export async function deleteAssertion(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!id) return;

  await db.delete(badgeAssertions).where(eq(badgeAssertions.id, id));
  revalidatePath("/assertions");
}
