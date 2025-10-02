import { db } from "@/db/clients";
import BadgeEntry from "./components/ui";
import { CreateBadgeModal } from "./components/crud";
import { BadgeClasses } from "@/db/schema";

export default async function BadgePage() {
  const badges = await db.select().from(BadgeClasses);

  return (
    <div className="min-h-screen w-full p-4 flex flex-col gap-4">
      {badges.map((badge) => (
        <BadgeEntry key={badge.id} {...badge} />
      ))}
      <CreateBadgeModal />
    </div>
  );
}
