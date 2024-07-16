import express from 'express';
import ratingController from '../controllers/rating.controllers.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create',authenticate,ratingController.createRating);
router.put('/product/:productId',authenticate,ratingController.getAllRatings)

export default router;