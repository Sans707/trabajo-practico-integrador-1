import { body, param } from 'express-validator';

export const articleValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 }).withMessage('El título debe tener entre 3 y 200 caracteres'),
  body('content')
    .trim()
    .isLength({ min: 50 }).withMessage('El contenido debe tener al menos 50 caracteres'),
  body('excerpt')
    .optional()
    .isLength({ max: 500 }).withMessage('El resumen no puede superar los 500 caracteres'),
  body('status')
    .optional()
    .isIn(['published', 'archived']).withMessage('El estado debe ser published o archived')
];

export const idParamValidation = [
  param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero válido')
];