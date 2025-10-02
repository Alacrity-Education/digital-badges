ALTER TABLE "recipients" RENAME TO "awardees";--> statement-breakpoint
ALTER TABLE "badge_assertions" RENAME COLUMN "recipient_id" TO "awardee_id";--> statement-breakpoint
ALTER TABLE "badge_assertions" DROP CONSTRAINT "badge_assertions_recipient_id_recipients_id_fk";
--> statement-breakpoint
ALTER TABLE "badge_assertions" ADD CONSTRAINT "badge_assertions_awardee_id_awardees_id_fk" FOREIGN KEY ("awardee_id") REFERENCES "public"."awardees"("id") ON DELETE cascade ON UPDATE no action;