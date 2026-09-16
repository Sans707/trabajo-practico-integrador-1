import { Router } from 'express';
import { createArticle, getArticles, deleteArticle } from '.article.controller.js';
import { articleValidation, idParamValidation } from '..article.validator.js';
import { validateResult } from '.validateResult.js';
import { authMiddleware } from '..authMiddleware.js';
import { ownerMiddleware } from '..ownerMiddleware.js';

const router = Router();

router.post('/', authMiddleware, articleValidation, validateResult, createArticle);
router.get('/', authMiddleware, getArticles);
router.delete('/:id', authMiddleware, idParamValidation, validateResult, ownerMiddleware, deleteArticle);

export default router;