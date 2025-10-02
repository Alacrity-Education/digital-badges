import { db } from "@/db/clients";
import { BadgeAssertions, Recipient, Recipients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { BadgeView, Actions, AwardeeView } from "./components/ui";
import { getBadgeById } from "../actions";

export type RecipientWithDate = Recipient & { issuedOn: string | null };

export default async function BadgePage({
  params,
}: {
  params: Promise<{ badgeid: string }>;
}) {
  const { badgeid } = await params;

  const badge = await getBadgeById(parseInt(badgeid));

  const recipients: RecipientWithDate[] = await getRecipientsWithDate(badgeid);

  return (
    <div className="pt-6 flex flex-col gap-4 items-center max-w-screen overflow-x-clip">
      <BadgeView {...badge} />
      <Actions {...badge} />
      <AwardeeView recipients={recipients} />
    </div>
  );
} //to do: solve overflow on <sm

async function getRecipientsWithDate(
  badgeid: string
): Promise<RecipientWithDate[]> {
  return await db
    .select({
      id: Recipients.id,
      identity: Recipients.identity,
      name: Recipients.name,
      type: Recipients.type,
      hashed: Recipients.hashed,
      createdAt: Recipients.createdAt,
      issuedOn: BadgeAssertions.issuedOn,
    })
    .from(Recipients)
    .leftJoin(BadgeAssertions, eq(Recipients.id, BadgeAssertions.recipientId))
    .where(eq(BadgeAssertions.badgeId, parseInt(badgeid)));
}
