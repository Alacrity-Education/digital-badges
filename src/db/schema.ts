import {
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  integer,
  date,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

// ISSUER
export const Issuers = pgTable("issuers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  engineUrl: text("engine_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type Issuer = InferSelectModel<typeof Issuers>;

// BADGE CLASS
export const BadgeClasses = pgTable("badge_classes", {
  id: serial("id").primaryKey(),
  uid: uuid("uid").defaultRandom().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("imageUrl"),
  criteria: text("criteria"),
  issuerId: integer("issuer_id").references(() => Issuers.id, {
    onDelete: "cascade",
  }),
  createdAt: date("created_at").defaultNow().notNull(),
});
export type Badge = InferSelectModel<typeof BadgeClasses>;

// RECIPIENT
export const Recipients = pgTable("recipients", {
  id: serial("id").primaryKey(),
  identity: text("identity").notNull(),
  name: text("name").notNull(),
  type: text("type").default("email").notNull(),
  hashed: text("hashed").default("false"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type Recipient = InferSelectModel<typeof Recipients>;

// BADGE ASSERTION
export const BadgeAssertions = pgTable("badge_assertions", {
  id: serial("id").primaryKey(),
  uid: uuid("uid").defaultRandom().notNull(),
  badgeId: serial("badge_id").references(() => BadgeClasses.id, {
    onDelete: "cascade",
  }),
  recipientId: serial("recipient_id").references(() => Recipients.id, {
    onDelete: "cascade",
  }),
  issuedOn: date("issued_on").defaultNow().notNull(),
  image: text("image"),
});
export type BadgeAssertion = InferSelectModel<typeof BadgeAssertions>;

export type NewIssuer = InferInsertModel<typeof Issuers>;
export type NewBadge = InferInsertModel<typeof BadgeClasses>;
export type NewRecipient = InferInsertModel<typeof Recipients>;
export type NewBadgeAssertion = InferInsertModel<typeof BadgeAssertions>;
