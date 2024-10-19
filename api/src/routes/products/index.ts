import e, { Router } from 'express';

// Endpoint pour la liste des produits
const router = Router();

router.get('/', (req, res) => {
  res.send('Liste des produits');
});

router.get('/:id', (req, res) => {
  console.log(req.params);
  res.send(`Produit ${req.params.id}`);
});

router.post('/', (req, res) => {
  res.send("Création d'un produit");
});

export default router;
