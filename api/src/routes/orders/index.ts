import { Router } from 'express';

import {
  listOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from './ordersController.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import { insertOrderWithItemSchema } from '../../db/ordersSchema.js';
import { verifyToken } from '../../middlewares/authMiddleware.js';

const router = Router();

router.post(
  '/',
  verifyToken,
  validateData(insertOrderWithItemSchema),
  createOrder
);

export default router;
