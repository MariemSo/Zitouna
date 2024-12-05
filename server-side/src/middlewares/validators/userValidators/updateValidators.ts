import { body } from 'express-validator';

export const updateProfileValidators = [
    body('userName')
        .optional()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters long.'),
    body('firstName')
        .optional()
        .isLength({ min: 1 })
        .withMessage('First name must be at least 1 character long.'),
    body('lastName')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Last name must be at least 1 character long.'),
    body('address')
        .optional()
        .isLength({ max: 255 })
        .withMessage('Address cannot exceed 255 characters.'),
    body('phoneNumber')
        .optional()
        .isNumeric()
        .withMessage('Phone number must be numeric.')
        .isLength({ min: 7, max: 15 })
        .withMessage('Phone number must be between 7 and 15 digits.')]