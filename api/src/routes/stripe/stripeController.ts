import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { orderItemsTable, ordersTable } from '../../db/ordersSchema.js';
import Stripe from 'stripe';
import { eq } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function getKeys(req: Request, res: Response) {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
}

export async function createPaymentIntent(req: Request, res: Response) {
  const { orderId } = req.body;

  const [order] = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.id, orderId));

  const orderItems = await db
    .select()
    .from(orderItemsTable)
    .where(eq(orderItemsTable.orderId, orderId));

  //Calcule le total de la commande (orderItems.price * orderItems.quantity)
  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const amount = Math.round(total * 100);

  const customer = await stripe.customers.create({
    email: req.body.email,
  });

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2022-11-15' }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'eur',
    customer: customer.id,
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      'pk_test_51MoidcJN16MdKZtcPdzZMFUbvLf3LTBi2mgB1zFeh2yq9ItslMscVZxQxDOCELhSFPVJF3RIqX9gdCnpsTCmZYwE008HTANBbl',
  });
}
