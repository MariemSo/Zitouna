import { body } from 'express-validator';

export const loginValidators = [
    body('email')
        .isEmail()
        .withMessage('Valid email is required.')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.'),
];
