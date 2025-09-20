"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/client";
import { badges } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Creates a new badge using the provided form data.
 *
 * @param formData - The form data containing badge details.
 * @returns An object indicating success or failure, with an error message if applicable.
 */
export async function createBadge(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name) return { ok: false as const, error: "Name is required." };

  await db.insert(badges).values({ name, description });
  revalidatePath("/badges");
  return { ok: true as const };
}

/**
 * Deletes a badge by its ID using the provided form data.
 *
 * @param formData - The form data containing the badge ID to delete.
 * @returns An object indicating success or failure, with an error message if applicable.
 */
export async function deleteBadge(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  if (!id) return { ok: false as const, error: "Invalid id." };

  await db.delete(badges).where(eq(badges.id, id));
  revalidatePath("/badges");
  return { ok: true as const };
}
