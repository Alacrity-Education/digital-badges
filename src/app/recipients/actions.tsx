"use server";
import { db } from "@/db/clients";
import { Recipients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type RecipientInput = { formData: FormData } | { name: string; email: string };

export async function createRecipient(input: RecipientInput) {
  let name: string;
  let email: string;

  if ("formData" in input) {
    // extract from formData
    name = String(input.formData.get("name") ?? "").trim();
    email = String(input.formData.get("email") ?? "").trim();
  } else {
    // explicit values
    name = input.name.trim();
    email = input.email.trim();
  }

  if (!name) return { ok: false as const, error: "Invalid name." };
  if (!email) return { ok: false as const, error: "Invalid email." };

  // first make a search if the awardee already exists
  if (await checkRecipientExists(email)) {
    return (await getRecipientByEmail(email))!;
  }

  const recipient = await db
    .insert(Recipients)
    .values({ name, identity: email })
    .returning();

  if (!recipient) {
    throw new Error("Failed to create awardee.");
  }

  revalidatePath("/badges");
  return recipient[0];
}

export async function checkRecipientExists(email: string) {
  return (
    (
      await db
        .select()
        .from(Recipients)
        .where(eq(Recipients.identity, email))
        .limit(1)
    ).length !== 0
  );
}

export async function deleteRecipientByRecipientId(awardeeId: number) {
  if (!awardeeId) throw new Error("Invalid awardeeId.");
  await db.delete(Recipients).where(eq(Recipients.id, awardeeId));
  revalidatePath("/awardees");
}

export async function getRecipientById(id: number) {
  if (!id) return null;
  const recipient = await db
    .select()
    .from(Recipients)
    .where(eq(Recipients.id, id))
    .limit(1);
  if (recipient.length === 0) return null;
  return recipient[0];
}

export async function getRecipientByEmail(email: string) {
  if (!email) return null;
  const recipient = await db
    .select()
    .from(Recipients)
    .where(eq(Recipients.identity, email))
    .limit(1);
  if (recipient.length === 0) return null;
  return recipient[0];
}
