import { Router } from 'express';
import { register, login, logout, getProfile } from '..auth.controller.js';
import { registerValidation, loginValidation } from '..auth.validator.js';
import { validateResult } from '.validateResult.js';
import { authMiddleware } from '.authMiddleware.js';

const router = Router();

router.post('/register', registerValidation, validateResult, register);
router.post('/login', loginValidation, validateResult, login);
router.post('/logout', authMiddleware, logout);
router.get('/profile', authMiddleware, getProfile);

export default router;