import {body} from "express-validator";

export const registerValidators = [
    body('email')
        .isEmail()
        .withMessage('Valid email is required.')
        .normalizeEmail(),
    body('userName')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters long.'),
    body('firstName')
        .notEmpty()
        .withMessage('First name is required.')
        .isLength({ min: 1, max: 20 })
        .withMessage('First name must be between 1 and 50 characters long.'),
    body('lastName')
        .notEmpty()
        .withMessage('Last name is required.')
        .isLength({ min: 1, max: 20 })
        .withMessage('Last name must be between 1 and 50 characters long.'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.')
        .matches(/\d/)
        .withMessage('Password must contain at least one number.'),
    body('address')
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage('Address cannot exceed 255 characters.'),
    body('phoneNumber')
        .optional()
        .isInt()
        .withMessage('Phone number must be a valid integer.'),
]

