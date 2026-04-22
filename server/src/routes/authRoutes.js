import express from 'express';
import {
  login,
  logout,
  refreshToken,
  getCurrentUser,
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.get('/me', authenticate, getCurrentUser);

export default router;
