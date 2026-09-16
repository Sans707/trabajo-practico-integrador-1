import { body } from 'express-validator';

export const tagValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 30 }).withMessage('La etiqueta debe tener entre 2 y 30 caracteres')
    .custom(value => !/\s/.test(value)).withMessage('La etiqueta no debe contener espacios')
];