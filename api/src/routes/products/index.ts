import { Router } from 'express';
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from './productController';
import { validateData } from '../../../src/middlewares/validationMiddleware';
import {
  createProductSchema,
  updateProductSchema,
} from '../../../src/db/productsSchema';

// Endpoint pour la liste des produits
const router = Router();

router.get('/', listProducts);

router.get('/:id', getProductById);

router.post('/', validateData(createProductSchema), createProduct);

router.put('/:id', validateData(updateProductSchema), updateProduct);

router.delete('/:id', deleteProduct);

export default router;
