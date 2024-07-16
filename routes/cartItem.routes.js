import express from 'express';
import cartItemController from '../controllers/cartItem.controllers.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.put('/:id',authenticate,cartItemController.updateCartItem);
router.delete('/:id',authenticate,cartItemController.removeCartItem);

export default router;