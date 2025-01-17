import { Request, Response } from 'express';
import { db } from '../../db/index';
import { eq } from 'drizzle-orm';
import _ from 'lodash';
import { categoriesTable } from '../../db/categoriesSchema';

// Recupérer la liste des produits
export async function listCategories(req: Request, res: Response) {
  try {
    const categories = await db.select().from(categoriesTable);
    res.json(categories);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Recupérer un produit par son id
export async function getCategoryById(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const [category] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, id));

    if (!category || category === undefined) {
      res.status(404).send('Aucun produit trouvé');
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Créer un produit
export async function createCategory(req: Request, res: Response) {
  try {
    const [category] = await db
      .insert(categoriesTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Mettre à jour un produit par son id
export async function updateCategory(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const updates = req.cleanBody;
    const [updateCategory] = await db
      .update(categoriesTable)
      .set({
        ...updates,
      })
      .where(eq(categoriesTable.id, id))
      .returning();
    if (!updateCategory || updateCategory === undefined) {
      res.status(404).send('Aucun produit trouvé');
    } else {
      res.status(200).json(updateCategory);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Supprimer un produit par son id
export async function deleteCategory(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const [deteleCategory] = await db
      .delete(categoriesTable)
      .where(eq(categoriesTable.id, id))
      .returning();
    if (!deteleCategory || deteleCategory === undefined) {
      res.status(404).send('Aucun produit trouvé');
    } else {
      res.status(200).json(deteleCategory);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
