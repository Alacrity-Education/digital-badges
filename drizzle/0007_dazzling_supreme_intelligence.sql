ALTER TABLE "badge_assertions" ALTER COLUMN "issued_on" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "badge_assertions" ALTER COLUMN "issued_on" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "issuers" ADD COLUMN "engine_url" text;