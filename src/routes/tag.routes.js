import { Router } from 'express';
import { createTag, getTags, getTagById, updateTag, deleteTag } from '.tag.controller.js';
import { tagValidation } from '.tag.validator.js';
import { idParamValidation } from '.article.validator.js';
import { validateResult } from '.validateResult.js';
import { authMiddleware } from '..authMiddleware.js';
import { adminMiddleware } from '..adminMiddleware.js';

const router = Router();

router.post('/', authMiddleware, adminMiddleware, tagValidation, validateResult, createTag);
router.get('/', authMiddleware, getTags);
router.get('/:id', authMiddleware, adminMiddleware, idParamValidation, validateResult, getTagById);
router.put('/:id', authMiddleware, adminMiddleware, idParamValidation, tagValidation, validateResult, updateTag);
router.delete('/:id', authMiddleware, adminMiddleware, idParamValidation, validateResult, deleteTag);

export default router;