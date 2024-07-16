import express from 'express';
import productController from '../controllers/product.controllers.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/',authenticate,productController.getAllProducts);
router.get('/id/:id',authenticate,productController.findProductById);

export default router;