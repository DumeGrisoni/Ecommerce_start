import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { ordersTable } from '../../db/ordersSchema';

// Recupérer la liste des commandes
export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await db.select().from(ordersTable);
    res.json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Recupérer une commande par son id
export async function getOrderById(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const [order] = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, id));

    if (!order || order === undefined) {
      res.status(404).send('Aucune commande trouvée');
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Créer une commande
export async function createOrder(req: Request, res: Response) {
  try {
    const [order] = await db.insert(ordersTable).values(req.body).returning();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Mettre à jour une commande par son id
export async function updateOrder(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const updatedFields = req.body;

    const [updatedOrder] = await db
      .update(ordersTable)
      .set(updatedFields)
      .where(eq(ordersTable.id, id))
      .returning();
    if (!updatedOrder || updatedOrder === undefined) {
      res.status(404).send('Aucune commande trouvée');
    } else {
      res.status(200).json(updatedOrder);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Supprimer une commande par son id
export async function deleteOrder(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const deletedOrder = await db
      .delete(ordersTable)
      .where(eq(ordersTable.id, id))
      .returning();
    if (!deletedOrder || deletedOrder === undefined) {
      res.status(404).send('Aucune commande trouvée');
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
