import express from 'express';
import productsRouter from './routes/products';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World top ca maintenant cool maintenant!');
});

app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port} ! c'est top`);
});
