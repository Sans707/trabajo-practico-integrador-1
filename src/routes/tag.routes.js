import { Router } from 'express';
import { createTag, getTags, getTagById, updateTag, deleteTag } from '../controllers/tag.controller.js';
import { tagValidation } from '../middlewares/validators/tag.validator.js';
import { idParamValidation } from '../middlewares/validators/article.validator.js';
import { validateResult } from '../middlewares/validateResult.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = Router();

router.post('/', authMiddleware, adminMiddleware, tagValidation, validateResult, createTag);
router.get('/', authMiddleware, getTags);
router.get('/:id', authMiddleware, adminMiddleware, idParamValidation, validateResult, getTagById);
router.put('/:id', authMiddleware, adminMiddleware, idParamValidation, tagValidation, validateResult, updateTag);
router.delete('/:id', authMiddleware, adminMiddleware, idParamValidation, validateResult, deleteTag);

export default router;