import { Request, Response } from 'express';

// Recupérer la liste des produits
export function listProducts(req: Request, res: Response) {
  res.send('Liste des produits');
}

// Recupérer un produit par son id
export function getProductById(req: Request, res: Response) {
  res.send(`Produit ${req.params.id}`);
}

// Créer un produit
export function createProduct(req: Request, res: Response) {
  console.log(req.body);

  res.send("Création d'un produit ici");
}

// Mettre à jour un produit
export function updateProduct(req: Request, res: Response) {
  res.send(`Mise à jour du produit ${req.params.id}`);
}

// Supprimer un produit
export function deleteProduct(req: Request, res: Response) {
  res.send(`Suppression du produit ${req.params.id}`);
}
