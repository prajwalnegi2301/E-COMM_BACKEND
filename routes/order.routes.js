import express from 'express';
import orderController from '../controllers/order.controllers.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/',authenticate,orderController.createOrder);
router.get('/user',authenticate,orderController.orderHistory);
router.get('/:id',authenticate,orderController.findOrderById);


export default router;