"use server";

import { db } from "@/db/client";
import { badgeClasses } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

// CREATE
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

  revalidatePath("/badge-classes");
}

// UPDATE
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

  revalidatePath("/badge-classes");
}

// DELETE
export async function deleteBadgeClass(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!id) return;

  await db.delete(badgeClasses).where(eq(badgeClasses.id, id));

  revalidatePath("/badge-classes");
}
