import express, { json, urlencoded } from 'express';
import productsRouter from './routes/products';

const app = express();
const port = 3000;

// Middlewares
app.use(urlencoded({ extended: false }));
app.use(json());

// Endpoint pour la racine de l'API
app.get('/', (req, res) => {
  res.send('Hello World top ca maintenant cool maintenant!');
});

// Utiliser le router des produits
app.use('/products', productsRouter);

// Reponse pour le lancement de l'API
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port} ! c'est top`);
});
