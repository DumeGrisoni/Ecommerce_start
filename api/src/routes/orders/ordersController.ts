import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { orderItemsTable, ordersTable } from '../../db/ordersSchema.js';
import { OrderItem } from '../../types/variants.js';

// Recupérer la liste des commandes de l'user, si c'est un admin retourner toutes les commandes
export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await db.select().from(ordersTable);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Recupérer une commande par son id
export async function getOrderById(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const orderWithItems = await db
      .select()
      .from(ordersTable)
      .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId))
      .where(eq(ordersTable.id, id));

    if (
      !orderWithItems ||
      orderWithItems === undefined ||
      orderWithItems.length === 0
    ) {
      res.status(404).send('Aucune commande trouvée');
    }

    const mergedOrder = {
      ...orderWithItems[0].orders,
      items: orderWithItems.map((item: any) => item.order_items),
    };
    res.status(200).json(mergedOrder);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Créer une commande
export async function createOrder(req: Request, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) {
      res
        .status(401)
        .json({ message: 'Vous devez être connecté pour créer une commande' });
    }
    console.log('body', req.cleanBody);
    const [newOrder] = await db
      .insert(ordersTable)
      //@ts-ignore
      .values({ userId: userId })
      .returning();

    //TODO: Valider les id des produits et prendre le prix dans la base de données
    const orderItems: OrderItem[] = req.cleanBody.items.map((item: any) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      colors: [item.color], // Extraire la couleur et la taille
      orderId: newOrder.id,
    }));
    const newOrderItems = await db
      .insert(orderItemsTable)
      .values(orderItems)
      .returning();

    res.status(201).json({ ...newOrder, items: newOrderItems });
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
    const deletedOrderItems = await db
      .delete(orderItemsTable)
      .where(eq(orderItemsTable.orderId, id))
      .returning();

    if (!deletedOrderItems || deletedOrderItems === undefined) {
      res.status(404).send('Aucune commande trouvée');
    } else {
      res.status(204).send();
      const deletedOrder = await db
        .delete(ordersTable)
        .where(eq(ordersTable.id, id))
        .returning();
      if (!deletedOrder || deletedOrder === undefined) {
        res.status(404).send('Aucune commande trouvée');
      } else {
        res.status(204).send();
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
