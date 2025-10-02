import { AwardeeEntry, AwardeeSearch } from "./components/ui";
import { db } from "@/db/clients";
import { BadgeAssertions, Recipients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { BadgeClasses } from "@/db/schema";
import { Award } from "../types";

export default async function AwardeesPage() {
  const awardees = await db.select().from(Recipients);

  return (
    <div className="flex flex-col items-center">
      <AwardeeSearch />
      <div className="flex flex-col items-center w-full px-2 gap-2">
        {awardees.map(async (awardee) => {
          //fetch awards for each awardee
          const awardsRaw = await db
            .select()
            .from(BadgeAssertions)
            .leftJoin(
              BadgeClasses,
              eq(BadgeAssertions.badgeId, BadgeClasses.id)
            )
            .where(eq(BadgeAssertions.recipientId, awardee.id));

          const awards: Award[] = awardsRaw.map((row) => ({
            badge: row.badge_classes!,
            assertion: row.badge_assertions,
          }));

          return (
            <AwardeeEntry key={awardee.id} awardee={awardee} awards={awards} />
          );
        })}
      </div>
    </div>
  );
}
