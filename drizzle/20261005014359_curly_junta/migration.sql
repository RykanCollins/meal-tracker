CREATE TYPE "meal_type" AS ENUM('breakfast', 'lunch', 'dinner', 'snack');--> statement-breakpoint
CREATE TABLE "foods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"calories_per_100g" numeric(8,2),
	"protein_per_100g" numeric(8,2),
	"carbs_per_100g" numeric(8,2),
	"fat_per_100g" numeric(8,2),
	"created_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meal_food_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"meal_id" uuid NOT NULL,
	"food_id" uuid,
	"name" text NOT NULL,
	"calories" numeric(8,2),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL,
	"name" text,
	"meal_type" "meal_type" NOT NULL,
	"logged_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY,
	"email" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "foods" ADD CONSTRAINT "foods_created_by_users_id_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "meal_food_items" ADD CONSTRAINT "meal_food_items_meal_id_meals_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "meal_food_items" ADD CONSTRAINT "meal_food_items_food_id_foods_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id");--> statement-breakpoint
ALTER TABLE "meals" ADD CONSTRAINT "meals_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");