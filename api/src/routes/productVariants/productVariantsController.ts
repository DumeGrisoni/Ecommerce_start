import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { eq } from 'drizzle-orm';
import _ from 'lodash';
import { productVariantsTable } from '../../db/productVariantSchema.js';

// Recupérer la liste des produits
export async function listProductVariants(req: Request, res: Response) {
  try {
    const productVariants = await db.select().from(productVariantsTable);
    res.json(productVariants);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Recupérer un produit par son id
export async function getProductVariantById(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const [productVariant] = await db
      .select()
      .from(productVariantsTable)
      .where(eq(productVariantsTable.id, id));

    if (!productVariant || productVariant === undefined) {
      res.status(404).send('Aucun produit trouvé');
    } else {
      res.status(200).json(productVariant);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Créer un produit
export async function createProductVariant(req: Request, res: Response) {
  try {
    const { productId, colors } = req.cleanBody;
    if (!productId || !colors || !Array.isArray(colors)) {
      return res
        .status(400)
        .send('la produit et les couleurs ses details sont obligatoires');
    }
    const variantData = { productId, colors };

    const [productVariant] = await db
      .insert(productVariantsTable)
      .values(variantData)
      .returning();

    res.status(201).json(productVariant);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Mettre à jour un produit par son id
export async function updateProductVariant(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const updatedFields = req.cleanBody;

    const [updatedProductVariant] = await db
      .update(productVariantsTable)
      .set(updatedFields)
      .where(eq(productVariantsTable.id, id))
      .returning();
    if (!updatedProductVariant || updatedProductVariant === undefined) {
      res.status(404).send('Aucun produit trouvé');
    } else {
      res.status(200).json(updatedProductVariant);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Supprimer un produit par son id
export async function deleteProductVariant(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const [deletedProductVariant] = await db
      .delete(productVariantsTable)
      .where(eq(productVariantsTable.id, id))
      .returning();
    if (!deletedProductVariant || deletedProductVariant === undefined) {
      res.status(404).send('Aucun produit trouvé');
    } else {
      res.status(200).json(deletedProductVariant);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
