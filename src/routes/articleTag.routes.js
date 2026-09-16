import { Router } from 'express';
import { addTagToArticle, removeTagFromArticle } from '../controllers/articleTag.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, addTagToArticle);
router.delete('/:articleTagId', authMiddleware, removeTagFromArticle);

export default router;