import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { categoriesTable } from './categoriesSchema';

export const productsTable = pgTable('products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  categoryId: integer().references(() => categoriesTable.id),
  image: varchar({ length: 255 }).notNull().array(),
  price: doublePrecision().notNull(),
});

export const createProductSchema = createInsertSchema(productsTable).omit({
  id: true,
});

export const updateProductSchema = createInsertSchema(productsTable)
  .omit({
    id: true,
  })
  .partial();
