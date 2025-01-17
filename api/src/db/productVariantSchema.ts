import { integer, jsonb, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const productVariantsTable = pgTable('product_variants', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  productId: varchar({ length: 255 }),
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
