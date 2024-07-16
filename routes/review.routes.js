import express from 'express';
import reviewController from '../controllers/review.controllers.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create',authenticate,reviewController.createReview);
router.get('/product/:productId',authenticate,reviewController.getAllReview);

export default router;