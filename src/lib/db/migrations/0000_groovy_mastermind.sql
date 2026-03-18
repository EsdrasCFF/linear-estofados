CREATE TYPE "public"."category" AS ENUM('sofas', 'cabeceiras', 'arte-em-tecido');--> statement-breakpoint
CREATE TABLE "consultation_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"message" text,
	"product_interest" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product_dimensions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"label" text DEFAULT 'Padrão' NOT NULL,
	"width_cm" integer,
	"depth_cm" integer,
	"height_cm" integer
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"category" "category" NOT NULL,
	"price_cents" integer NOT NULL,
	"short_description" text,
	"differentials" text[] DEFAULT '{}',
	"image_urls" text[] DEFAULT '{}',
	"color" text,
	"material" text,
	"weight_kg" numeric(6, 2),
	"is_active" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "product_dimensions" ADD CONSTRAINT "product_dimensions_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;