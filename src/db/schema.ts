import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
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
