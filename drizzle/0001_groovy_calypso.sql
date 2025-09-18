CREATE TABLE "badge_assertions" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"badge_id" serial NOT NULL,
	"recipient_id" serial NOT NULL,
	"issued_on" timestamp DEFAULT now() NOT NULL,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "badge_classes" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"image" text,
	"criteria" text,
	"issuer_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "issuers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recipients" (
	"id" serial PRIMARY KEY NOT NULL,
	"identity" text NOT NULL,
	"type" text DEFAULT 'email' NOT NULL,
	"hashed" text DEFAULT 'false',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "badge_assertions" ADD CONSTRAINT "badge_assertions_badge_id_badge_classes_id_fk" FOREIGN KEY ("badge_id") REFERENCES "public"."badge_classes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "badge_assertions" ADD CONSTRAINT "badge_assertions_recipient_id_recipients_id_fk" FOREIGN KEY ("recipient_id") REFERENCES "public"."recipients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "badge_classes" ADD CONSTRAINT "badge_classes_issuer_id_issuers_id_fk" FOREIGN KEY ("issuer_id") REFERENCES "public"."issuers"("id") ON DELETE cascade ON UPDATE no action;