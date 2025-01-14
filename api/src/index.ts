import express, { json, urlencoded } from 'express';
import productsRouter from './routes/products/index.js';
import ordersRouter from './routes/orders/index.js';
import productVariantsRouter from './routes/productVariants/index.js';
import categoriesRouter from './routes/categories/index.js';
import authRouter from './routes/auth/index.js';
import serverless from 'serverless-http';
import stripeRouter from './routes/stripe/index.js';

const app = express();
const port = 3001;
const host = '192.168.1.34';

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);

// Middlewares
app.use(urlencoded({ extended: false }));
app.use(json());

// Endpoint pour la racine de l'API
app.get('/', (req, res) => {
  res.send('Hello World !');
});

// Utiliser le router des produits
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/categories', categoriesRouter);
app.use('/productVariant', productVariantsRouter);

// Utiliser le router de l'authentification
app.use('/auth', authRouter);

// Utiliser le router de Stripe
// app.use('/stripe', stripeRouter);

// Reponse pour le lancement de l'API
if (process.env.NODE_ENV === 'dev') {
  app.listen(port, host, () => {
    console.log(`App listening at ${process.env.DATABASE_URL}`);
  });
} else {
  app.listen(port, () => {
    console.log(`App listening at ${process.env.DATABASE_URL}`);
  });
}

export const handler = serverless(app);
