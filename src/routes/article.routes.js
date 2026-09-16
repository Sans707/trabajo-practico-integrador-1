import { Router } from 'express';
import { createArticle, getArticles, deleteArticle } from '../controllers/article.controller.js';
import { articleValidation, idParamValidation } from '../middlewares/validators/article.validator.js';
import { validateResult } from '../middlewares/validateResult.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { ownerMiddleware } from '../middlewares/ownerMiddleware.js';

const router = Router();

router.post('/', authMiddleware, articleValidation, validateResult, createArticle);
router.get('/', authMiddleware, getArticles);
router.delete('/:id', authMiddleware, idParamValidation, validateResult, ownerMiddleware, deleteArticle);

export default router;