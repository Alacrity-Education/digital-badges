"use server";

import { db } from "@/db/client";
import { badgeClasses } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

// CREATE
/**
 * Creates a new badge class using the provided form data.
 *
 * Extracts the badge class details from the `formData` object, validates required fields,
 * and inserts a new record into the `badgeClasses` database table. After insertion,
 * it triggers a revalidation of the `/badge-classes` path.
 *
 * @param formData - The form data containing badge class details:
 *   - `name`: The name of the badge class.
 *   - `description`: A description of the badge class.
 *   - `image`: The image URL or identifier for the badge class.
 *   - `criteria`: The criteria for earning the badge.
 *   - `issuerId`: The ID of the issuer.
 * @returns A promise that resolves when the badge class has been created.
 */
export async function createBadgeClass(formData: FormData): Promise<void> {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const criteria = String(formData.get("criteria") ?? "").trim();
  const issuerId = Number(formData.get("issuerId"));

  if (!name || !issuerId) return;

  await db.insert(badgeClasses).values({
    name,
    description,
    image,
    criteria,
    issuerId,
  });

  revalidatePath("/badges");
}

// UPDATE
/**
 * Updates an existing badge class with new data from the provided form.
 *
 * Extracts the badge class ID, name, description, image, and criteria from the `FormData`.
 * If the ID is valid, updates the corresponding badge class record in the database.
 * After updating, triggers a revalidation of the "/badge-classes" path.
 *
 * @param formData - The form data containing badge class fields to update.
 * @returns A promise that resolves when the update and revalidation are complete.
 */
export async function updateBadgeClass(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const criteria = String(formData.get("criteria") ?? "").trim();

  if (!id) return;

  await db
    .update(badgeClasses)
    .set({ name, description, image, criteria })
    .where(eq(badgeClasses.id, id));

  revalidatePath("/badges");
}

// DELETE
/**
 * Deletes a badge class from the database based on the provided form data.
 *
 * @param formData - The form data containing the "id" of the badge class to delete.
 * @returns A promise that resolves when the badge class has been deleted.
 *
 * @remarks
 * If the "id" is not present or invalid, the function returns early without performing any deletion.
 * After deletion, the path "/badge-classes" is revalidated.
 */
export async function deleteBadgeClass(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!id) return;

  await db.delete(badgeClasses).where(eq(badgeClasses.id, id));

  revalidatePath("/badges");
}
