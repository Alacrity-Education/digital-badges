import { Badge } from "@/db/schema";

export class BadgeFactory implements BadgeFactory {
  async makeBadge(overrides?: Badge): Promise<Badge> {
    const defaultBadge: Partial<Badge> = {
      name: "",
      description: null,
    };

    return { ...defaultBadge, ...overrides } as Badge;
  }
}
