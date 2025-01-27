import { Router } from 'express';
import {
  listProductVariants,
  getProductVariantById,
  createProductVariant,
  updateProductVariant,
  deleteProductVariant,
} from './productVariantsController.js';
import {
  asyncHandler,
  validateData,
} from '../../middlewares/validationMiddleware.js';
import {
  createProductVariantSchema,
  updateProductVariantSchema,
} from '../../db/productVariantSchema.js';
import { verifyRole, verifyToken } from '../../middlewares/authMiddleware.js';

// Endpoint pour la liste des produits
const router = Router();

router.get('/', asyncHandler(listProductVariants));

router.get('/:id', asyncHandler(getProductVariantById));

router.post(
  '/',
  verifyToken,
  verifyRole,
  validateData(createProductVariantSchema),
  asyncHandler(createProductVariant)
);

router.put(
  '/:id',
  verifyToken,
  verifyRole,
  validateData(updateProductVariantSchema),
  asyncHandler(updateProductVariant)
);

router.delete(
  '/:id',
  verifyToken,
  verifyRole,
  asyncHandler(deleteProductVariant)
);

export default router;
