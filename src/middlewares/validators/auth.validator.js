import { body } from 'express-validator';

export const registerValidation = [
  body('username')
    .isAlphanumeric().withMessage('El nombre de usuario debe ser alfanumérico')
    .isLength({ min: 3, max: 20 }).withMessage('El nombre de usuario debe tener entre 3 y 20 caracteres'),
  body('email')
    .isEmail().withMessage('Debe proporcionar un email válido'),
  body('password')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('La contraseña debe incluir al menos una mayúscula, una minúscula y un número'),
  body('role')
    .optional()
    .isIn(['user', 'admin']).withMessage('El rol debe ser user o admin')
];

export const loginValidation = [
  body('email').isEmail().withMessage('Email no válido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
];