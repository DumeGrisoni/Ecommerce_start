import { Router } from 'express';
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from './productController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  createProductSchema,
  updateProductSchema,
} from '../../db/productsSchema';
import { verifyRole, verifyToken } from '../../middlewares/authMiddleware';

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
