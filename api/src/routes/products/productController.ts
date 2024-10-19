import { Request, Response } from 'express';

export function listProducts(req: Request, res: Response) {
  res.send('Liste des produits');
}

export function getProductById(req: Request, res: Response) {
  res.send(`Produit ${req.params.id}`);
}

export function createProduct(req: Request, res: Response) {
  res.send("Création d'un produit ici");
}

export function updateProduct(req: Request, res: Response) {
  res.send(`Mise à jour du produit ${req.params.id}`);
}

export function deleteProduct(req: Request, res: Response) {
  res.send(`Suppression du produit ${req.params.id}`);
}
