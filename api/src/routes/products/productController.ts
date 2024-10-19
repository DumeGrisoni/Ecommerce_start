import { Request, Response } from 'express';
import { db } from '../../db/index';
import { productsTable, createProductSchema } from '../../db/productsSchema';
import { eq } from 'drizzle-orm';
import _ from 'lodash';

// Recupérer la liste des produits
export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Recupérer un produit par son id
export async function getProductById(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id));

    if (!product || product === undefined) {
      res.status(404).send('Aucun produit trouvé');
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Créer un produit
export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Mettre à jour un produit par son id
export async function updateProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const updatedFields = req.cleanBody;

    const [updatedProduct] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();
    if (!updatedProduct || updatedProduct === undefined) {
      res.status(404).send('Aucun produit trouvé');
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Supprimer un produit par son id
export async function deleteProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();
    if (!deletedProduct || deletedProduct === undefined) {
      res.status(404).send('Aucun produit trouvé');
    } else {
      res.status(200).json(deletedProduct);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
