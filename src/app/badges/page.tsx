"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/clients";
import { badges } from "@/db/schema";
import { eq } from "drizzle-orm";

/** Create a new badge from form data. Must return Promise<void> for <form action>. */
export async function createBadge(formData: FormData): Promise<void> {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name) {
    // simple no-op on invalid input; you can later redirect with a query param
    return;
  }

  await db.insert(badges).values({ name, description });
  revalidatePath("/badges");
}

/** Delete a badge by id. Must return Promise<void>. */
export async function deleteBadge(formData: FormData): Promise<void> {
  const id = Number(formData.get("id") ?? 0);
  if (!id) return;

  await db.delete(badges).where(eq(badges.id, id));
  revalidatePath("/badges");
}
