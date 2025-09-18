import { pgTable, serial, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";


// our badges table
export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Badge = InferSelectModel<typeof badges>;    // a row (when reading)
export type NewBadge = InferInsertModel<typeof badges>; // a new row (when inserting)

// --- NEW TABLES START HERE ---

// ISSUER
export const issuers = pgTable("issuers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type Issuer = InferSelectModel<typeof issuers>;
export type NewIssuer = InferInsertModel<typeof issuers>;

// BADGE CLASS
export const badgeClasses = pgTable("badge_classes", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").defaultRandom().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),
  criteria: text("criteria"),
  issuerId: integer("issuer_id").references(() => issuers.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type BadgeClass = InferSelectModel<typeof badgeClasses>;
export type NewBadgeClass = InferInsertModel<typeof badgeClasses>;

// RECIPIENT
export const recipients = pgTable("recipients", {
  id: serial("id").primaryKey(),
  identity: text("identity").notNull(),
  type: text("type").default("email").notNull(),
  hashed: text("hashed").default("false"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type Recipient = InferSelectModel<typeof recipients>;
export type NewRecipient = InferInsertModel<typeof recipients>;

// BADGE ASSERTION
export const badgeAssertions = pgTable("badge_assertions", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").defaultRandom().notNull(),
  badgeId: serial("badge_id").references(() => badgeClasses.id, { onDelete: "cascade" }),
  recipientId: serial("recipient_id").references(() => recipients.id, { onDelete: "cascade" }),
  issuedOn: timestamp("issued_on").defaultNow().notNull(),
  image: text("image"),
});
export type BadgeAssertion = InferSelectModel<typeof badgeAssertions>;
export type NewBadgeAssertion = InferInsertModel<typeof badgeAssertions>;
