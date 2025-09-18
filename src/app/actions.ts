"use server";

import { db } from "@/db/clients";
import { issuers } from "@/db/schema";
import { revalidatePath } from "next/cache";


export async function createIssuer(formData: FormData): Promise<void> {
  const name = String(formData.get("name") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();

  if (!name || !url) return;

  await db.insert(issuers).values({
    name,
    url,
  });

  revalidatePath("/issuers");
}
