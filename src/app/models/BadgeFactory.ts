import { db } from "@/db/clients";
import { IBadge, IBadgeFactory } from "../types";
import { Badge } from "./Badge";
import { badges } from "@/db/schema";

export class BadgeFactory implements IBadgeFactory {
  async makeBadge(overrides?: Partial<IBadge>): Promise<IBadge> {
    const defaultBadge: Partial<IBadge> = {
      name: "",
      description: null,
      createdAt: new Date(),
    };

    const badge: Badge = (
      (await db
        .insert(badges)
        .values({ ...defaultBadge, ...overrides })
        .returning()) as Badge[]
    )[0];
    if (!badge) {
      throw new Error("Failed to create badge");
    }
    return badge;
  }
}
