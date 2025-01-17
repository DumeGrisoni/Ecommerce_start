import { Router } from 'express';

import {
  listOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from './ordersController.js';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertOrderWithItemSchema,
  updateOrderSchema,
} from '../../db/ordersSchema';
import { verifyToken } from '../../middlewares/authMiddleware';

const router = Router();

router.post(
  '/',
  verifyToken,
  validateData(insertOrderWithItemSchema),
  createOrder
);

router.get('/', verifyToken, listOrders);

router.get('/:id', verifyToken, getOrderById);

router.put('/:id', verifyToken, validateData(updateOrderSchema), updateOrder);

export default router;
