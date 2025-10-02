//primitives
// declare module "@/db/client";
// declare module "@/db/schema";

import { Issuer, NewBadgeAssertion } from "@/db/schema";
import { Awardee } from "@/db/schema";
import { Badge } from "@/db/schema";
import { BadgeAssertion } from "@/db/schema";
export interface IssuerFactory {
  makeIssuer: (overrides?: Partial<Issuer>) => Issuer;
}

export interface BadgeFactory {
  makeBadge: (overrides?: Partial<Badge>) => Promise<Badge>;
}

export interface BadgeAssertionBuilder {
  setBadgeId(badgeId: number): BadgeAssertionBuilder;
  setRecipientId(recipientId: number): BadgeAssertionBuilder;
  setIssuedOn(issuedOn: Date): BadgeAssertionBuilder;
  setImage(image: string | null): BadgeAssertionBuilder;
  build(): NewBadgeAssertion;
}

export interface BadgeAssertionBuilderFactory {
  static createBuilder(): BadgeAssertionBuilder;
}

export interface AwardeeFactory {
  makeRecipient: (overrides?: Partial<Awardee>) => Promise<Recipient>;
}

// domain

export interface Award {
  assertion: BadgeAssertion;
  badge: Badge;
}
