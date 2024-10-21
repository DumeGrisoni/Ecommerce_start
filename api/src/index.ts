import express, { json, urlencoded } from 'express';
import productsRouter from './routes/products/index.js';
import authRouter from './routes/auth/index.js';
import serverless from 'serverless-http';

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

// Utiliser le router de l'authentification
app.use('/auth', authRouter);

// Reponse pour le lancement de l'API
if (process.env.NODE_ENV === 'dev') {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port} ! c'est top`);
  });
}

export const handler = serverless(app);
