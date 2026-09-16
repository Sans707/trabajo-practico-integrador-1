import { Router } from 'express';
import { register, login, logout, getProfile } from '../controllers/auth.controller.js';
import { registerValidation, loginValidation } from '../middlewares/validators/auth.validator.js';
import { validateResult } from '../middlewares/validateResult.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', registerValidation, validateResult, register);
router.post('/login', loginValidation, validateResult, login);
router.post('/logout', authMiddleware, logout);
router.get('/profile', authMiddleware, getProfile);

export default router;