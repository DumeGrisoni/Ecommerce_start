import {
  integer,
  pgTable,
  varchar,
  timestamp,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import { usersTable } from './usersSchema.js';
import { productsTable } from './productsSchema.js';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const ordersTable = pgTable('orders', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default('Nouveau'),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
});

export const orderItemsTable = pgTable('order_items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .notNull()
    .references(() => ordersTable.id),
  productId: integer()
    .notNull()
    .references(() => productsTable.id),
  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({
  id: true,
  userId: true,
  createdAt: true,
  status: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItemsTable).omit({
  id: true,
  orderId: true,
});

export const insertOrderWithItemSchema = z.object({
  order: insertOrderSchema,
  items: z.array(insertOrderItemSchema),
});
