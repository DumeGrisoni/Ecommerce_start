import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const categoriesTable = pgTable('categories', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull(),
  productsIds: integer().array().default([]),
  createdAt: timestamp().notNull().defaultNow(),
});

export const insertCategorySchema = createInsertSchema(categoriesTable).omit({
  id: true,
  productsIds: true,
  createdAt: true,
});

export const updateCategorySchema = createInsertSchema(categoriesTable)
  .omit({
    productsIds: true,
    createdAt: true,
  })
  .partial();
