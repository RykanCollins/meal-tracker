import {
  pgTable,
  pgEnum,
  text,
  uuid,
  numeric,
  timestamp,
} from 'drizzle-orm/pg-core';

export const mealTypeEnum = pgEnum('meal_type', [
  'breakfast',
  'lunch',
  'dinner',
  'snack',
]);

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const foods = pgTable('foods', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  caloriesPer100g: numeric('calories_per_100g', { precision: 8, scale: 2 }),
  proteinPer100g: numeric('protein_per_100g', { precision: 8, scale: 2 }),
  carbsPer100g: numeric('carbs_per_100g', { precision: 8, scale: 2 }),
  fatPer100g: numeric('fat_per_100g', { precision: 8, scale: 2 }),
  createdBy: text('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const meals = pgTable('meals', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  name: text('name'),
  mealType: mealTypeEnum('meal_type').notNull(),
  loggedAt: timestamp('logged_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const mealFoodItems = pgTable('meal_food_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  mealId: uuid('meal_id')
    .notNull()
    .references(() => meals.id, { onDelete: 'cascade' }),
  foodId: uuid('food_id').references(() => foods.id),
  name: text('name').notNull(),
  calories: numeric('calories', { precision: 8, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Food = typeof foods.$inferSelect;
export type NewFood = typeof foods.$inferInsert;

export type Meal = typeof meals.$inferSelect;
export type NewMeal = typeof meals.$inferInsert;

export type MealFoodItem = typeof mealFoodItems.$inferSelect;
export type NewMealFoodItem = typeof mealFoodItems.$inferInsert;
