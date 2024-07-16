import express from 'express';
import orderController from '../controllers/adminOrder.controllers.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/',authenticate,orderController.getAllOrders);
router.put('/:orderId/confirmed',authenticate,orderController.confirmedOrders);
router.put('/:orderId/ship',authenticate,orderController.shipOrders);
router.put('/:orderId/deliver',authenticate,orderController.deliverOrders);
router.put('/:orderId/cancel',authenticate,orderController.cancelledOrders);
router.put('/:orderId/delete',authenticate,orderController.deleteOrders);


export default router;