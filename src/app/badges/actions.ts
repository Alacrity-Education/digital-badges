"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/client";
import { badges } from "@/db/schema";
import { eq } from "drizzle-orm";

/** Create a new badge from form data. */
export async function createBadge(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name) return { ok: false as const, error: "Name is required." };

  await db.insert(badges).values({ name, description });
  revalidatePath("/badges");
  return { ok: true as const };
}

/** Delete a badge by id. */
export async function deleteBadge(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  if (!id) return { ok: false as const, error: "Invalid id." };

  await db.delete(badges).where(eq(badges.id, id));
  revalidatePath("/badges");
  return { ok: true as const };
}
