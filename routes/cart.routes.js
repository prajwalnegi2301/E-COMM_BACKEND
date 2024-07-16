import express from 'express';
import cartController from '../controllers/cart.controllers.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/',authenticate,cartController.findUserCart);
router.put('/add',authenticate,cartController.addItemToCart);

export default router;