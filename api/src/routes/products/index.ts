import { Router } from 'express';
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from './productController.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../../../src/db/productsSchema.js';
import { verifyRole, verifyToken } from '../../middlewares/authMiddleware.js';

// Endpoint pour la liste des produits
const router = Router();

router.get('/', listProducts);

router.get('/:id', getProductById);

router.post(
  '/',
  verifyToken,
  verifyRole,
  validateData(createProductSchema),
  createProduct
);

router.put(
  '/:id',
  verifyToken,
  verifyRole,
  validateData(updateProductSchema),
  updateProduct
);

router.delete('/:id', verifyToken, verifyRole, deleteProduct);

export default router;
