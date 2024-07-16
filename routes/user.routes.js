import express from 'express';
import userController from '../controllers/user.controllers.js';

const router = express.Router();
router.get('/profile',userController.getUserProfile);
router.get('/',userController.getAllUsers);

export default router;