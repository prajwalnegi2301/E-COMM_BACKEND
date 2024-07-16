import express from 'express';
import productController from '../controllers/product.controllers.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/',authenticate,productController.createProduct);
router.post('/create',authenticate,productController.createMultipleProduct);
router.delete('/:id',authenticate,productController.deleteProduct);
router.put('/:id',authenticate,productController.updateProduct)

export default router;