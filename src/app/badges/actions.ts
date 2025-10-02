"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/clients";
import { BadgeClasses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

/**
 * Creates a new badge using the provided form data.
 *
 * @param formData - The form data containing badge details.
 * @returns An object indicating success or failure, with an error message if applicable.
 */
export async function createBadge(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const criteria = String(formData.get("criteria") ?? "").trim();

  if (!name) throw new Error("Name is required.");
  if (!description) throw new Error("Description is required.");
  if (!imageUrl) throw new Error("Image URL is required.");
  if (!criteria) throw new Error("Criteria is required.");

  const issuerId = 0;

  await db
    .insert(BadgeClasses)
    .values({ issuerId, name, description, criteria, imageUrl });
  revalidatePath("/badges");
}

/**
 * Deletes a badge by its ID using the provided form data.
 *
 * @param formData - The form data containing the badge ID to delete.
 * @returns An object indicating success or failure, with an error message if applicable.
 */
export async function deleteBadge(id: number) {
  if (!id) throw new Error("Invalid badge ID.");

  await db.delete(BadgeClasses).where(eq(BadgeClasses.id, id));
  revalidatePath("/badges");
  redirect("/badges");
}

export async function getBadgeById(badgeid: number) {
  return (
    await db.select().from(BadgeClasses).where(eq(BadgeClasses.id, badgeid))
  )[0];
}

export async function getBadgeByUUID(uuid: string) {
  return (
    await db
      .select()
      .from(BadgeClasses)
      .where(eq(BadgeClasses.uid, uuid))
      .limit(1)
  )[0];
}
