import { Router } from 'express';
import { validateData } from '../../middlewares/validationMiddleware.js';
import {
  insertCategorySchema,
  updateCategorySchema,
} from '../../db/categoriesSchema.js';
import { verifyRole, verifyToken } from '../../middlewares/authMiddleware.js';
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  listCategories,
  updateCategory,
} from './categoriesController.js';

// Endpoint pour la liste des produits
const router = Router();

router.get('/', listCategories);

router.get('/:id', getCategoryById);

router.post(
  '/',
  verifyToken,
  verifyRole,
  validateData(insertCategorySchema),
  createCategory
);

router.put(
  '/:id',
  verifyToken,
  verifyRole,
  validateData(updateCategorySchema),
  updateCategory
);

router.delete('/:id', verifyToken, verifyRole, deleteCategory);

export default router;
