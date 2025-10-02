ALTER TABLE "awardees" RENAME TO "recipients";--> statement-breakpoint
ALTER TABLE "badge_assertions" RENAME COLUMN "awardee_id" TO "recipient_id";--> statement-breakpoint
ALTER TABLE "badge_assertions" DROP CONSTRAINT "badge_assertions_awardee_id_awardees_id_fk";
--> statement-breakpoint
ALTER TABLE "recipients" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "badge_assertions" ADD CONSTRAINT "badge_assertions_recipient_id_recipients_id_fk" FOREIGN KEY ("recipient_id") REFERENCES "public"."recipients"("id") ON DELETE cascade ON UPDATE no action;