import { integer, jsonb, pgTable, varchar } from 'drizzle-orm/pg-core';
import { productsTable } from './productsSchema.js';
import { createInsertSchema } from 'drizzle-zod';

export const productVariantsTable = pgTable('product_variants', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  productId: integer().references(() => productsTable.id),
  colors: jsonb('colors').array().notNull().default([]),
});

export const createProductVariantSchema = createInsertSchema(
  productVariantsTable
).omit({
  id: true,
});

export const updateProductVariantSchema = createInsertSchema(
  productVariantsTable
)
  .omit({
    id: true,
  })
  .partial();
