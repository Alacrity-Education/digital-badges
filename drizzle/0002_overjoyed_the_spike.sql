ALTER TABLE "badge_classes" ALTER COLUMN "issuer_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "badge_classes" ALTER COLUMN "issuer_id" DROP NOT NULL;