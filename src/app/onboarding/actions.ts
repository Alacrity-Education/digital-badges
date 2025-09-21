"use server";

import { db } from "@/db/clients";
import { issuers } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IIssuer, IIssuerFactory } from "../types";
import { IssuerFactory } from "../models/IssuerFactory";

/**
 * Creates a new issuer record in the database using the provided form data.
 * 
 * Extracts the "name" and "url" fields from the given FormData, validates them,
 * and inserts a new issuer into the database. After insertion, it triggers a revalidation
 * of the "/issuers" path to ensure the UI reflects the latest data.
 *
 * @param formData - The FormData object containing issuer details ("name" and "url").
 * @returns A Promise that resolves when the issuer has been created and the path revalidated.
 */
export async function createIssuer(formData: FormData): Promise<void> {
  const name = String(formData.get("name") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();

  if (!name || !url) return;

  const issuer : IIssuer = await IssuerFactory.makeIssuer({ name, url });

  const returnedIssuer = await db.insert(issuers).values(issuer).returning();
  console.log("Created issuer:", returnedIssuer);
  redirect("/");
}
