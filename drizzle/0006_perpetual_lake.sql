ALTER TABLE "badge_classes" ALTER COLUMN "created_at" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "badge_classes" ALTER COLUMN "created_at" SET DEFAULT now();