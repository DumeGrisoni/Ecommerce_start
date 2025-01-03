import { Router } from 'express';
import { createPaymentIntent, getKeys } from './stripeController';
import { verifyToken } from '../../middlewares/authMiddleware.js';

const router = Router();

// Endpoints

router.get('/keys', getKeys);

router.post('/create-payment-intent', verifyToken, createPaymentIntent);

export default router;
