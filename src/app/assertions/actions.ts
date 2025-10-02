"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/clients";
import { BadgeAssertion, BadgeAssertions } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  checkRecipientExists,
  createRecipient,
  getRecipientById,
} from "../recipients/actions";
import { BadgeAssertionBuilderFactory } from "../models/BadgeAssertionBuilderFactory";
import { getIssuer } from "../onboarding/actions";
import { getBadgeById } from "../badges/actions";
import { sendEmailToAwardee } from "../email/email";

/**
 * Deletes an assertion by its ID using the provided form data.
 *
 * @param formData - The form data containing the assertion ID to delete.
 */
export async function deleteAssertionByAssertionId(id: number): Promise<void> {
  if (!id) return;

  await db.delete(BadgeAssertions).where(eq(BadgeAssertions.id, id));
  revalidatePath("/assertion");
}

export async function deleteAssertionByUserId(userId: number): Promise<void> {
  if (!userId) return;
  await db
    .delete(BadgeAssertions)
    .where(eq(BadgeAssertions.recipientId, userId));
  revalidatePath("/assertion");
}

export async function createAssertion({
  badgeId,
  awardeeId,
  imageUrl,
}: {
  badgeId: number;
  awardeeId: number;
  imageUrl: string;
}): Promise<BadgeAssertion> {
  const badgeAssertionBuilderFactory = new BadgeAssertionBuilderFactory();
  const badgeAssertionBuilder = badgeAssertionBuilderFactory.createBuilder();
  const badgeAssertionData = badgeAssertionBuilder
    .setBadgeId(badgeId)
    .setRecipientId(awardeeId)
    .setImage(imageUrl)
    .build();
  return (
    await db.insert(BadgeAssertions).values(badgeAssertionData).returning()
  )[0];
}

export async function grantBadge(
  badgeId: number,
  issuerId: number,
  formData: FormData
) {
  //get email and name form formData
  const email = String(formData.get("email") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();

  if (!email) throw new Error("Invalid email.");
  if (!name) throw new Error("Invalid name.");

  //get issuer
  const issuer = await getIssuer();
  if (!issuer) throw new Error("Invalid issuer.");

  //get badge
  const badge = await getBadgeById(badgeId);
  if (!badge) throw new Error("Invalid badge.");

  const recipient = await createRecipient({ name, email });
  if (!recipient || "error" in recipient) {
    throw new Error("Failed to create or find recipient.");
  }
  //create assertion using the builder method
  const badgeAssertion = await createAssertion({
    badgeId: badge.id,
    awardeeId: recipient.id,
    imageUrl: badge.imageUrl!,
  });
  if (!badgeAssertion) throw new Error("Failed to create assertion.");

  await sendEmailToAwardee({ issuer, badge, recipient, badgeAssertion });

  revalidatePath("/awardees");
  revalidatePath("/badges");
}

export async function getAssertionByUUID(uuid: string) {
  const assertion = (
    await db
      .select()
      .from(BadgeAssertions)
      .where(eq(BadgeAssertions.uid, uuid))
      .limit(1)
  )[0];

  const recipient = await getRecipientById(assertion.recipientId);
  const badge = await getBadgeById(assertion.badgeId);
  const issuer = await getIssuer();

  return {
    "@context": "https://purl.imsglobal.org/spec/ob/v3p0/context.json",
    "@contextMapping": {
      obv3: "https://purl.imsglobal.org/spec/ob/v3p0/context.json",
      vc: "https://www.w3.org/2018/credentials/v1",
    },
    type: ["VerifiableCredential", "BadgeCredential"],
    recipient,
    badge: issuer?.engineUrl + "/api/badges/" + badge?.uid,
    ...assertion,
  };
}

// export async function createAssertionsBulk(
//   badgeId: number,
//   imageUrl: string | null,
//   formData: FormData
// ) {
//   if (!badgeId) throw new Error("Invalid badgeId.");
//   if (!imageUrl) throw new Error("Invalid badgeUrl.");
//   const csvFile = formData.get("csv");
//   if (!csvFile || !(csvFile instanceof File)) {
//     throw new Error("CSV file is required.");
//   }
//   const text = await csvFile.text();
//   const lines = text.split(/\r?\n/).filter(Boolean);
//   const recipients: { name: string; email: string }[] = [];

//   for (const line of lines) {
//     const [name, email] = line.split(",").map((s) => s.trim());
//     if (name && email) {
//       recipients.push({ name, email });
//     }
//   }
//   if (recipients.length === 0) {
//     throw new Error("No valid recipients found in CSV.");
//   }
//   // create awardees and assertions
//   for (const recipient of recipients) {
//     const awardee = await createRecipient(
//       new FormData(Object.entries(recipient) as any)
//     );
//     if (!awardee || "error" in awardee) {
//       console.warn(
//         `Failed to create or find awardee for email: ${recipient.email}`
//       );
//       continue;
//     }

//     const badgeAssertionBuilderFactory = new BadgeAssertionBuilderFactory();
//     const badgeAssertionBuilder = badgeAssertionBuilderFactory.createBuilder();
//     const badgeAssertionData = badgeAssertionBuilder
//       .setBadgeId(badgeId)
//       .setRecipientId(awardee.id)
//       .setImage(imageUrl)
//       .setIssuedOn(new Date())
//       .build();

//     await db.insert(BadgeAssertions).values(badgeAssertionData);
//   }
//   revalidatePath("/badges");
//   revalidatePath("/awardees");
// }
