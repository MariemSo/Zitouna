import {body} from "express-validator"

const stepValidatorRules= [
    body('stepNumber')
        .notEmpty()
        .withMessage('Step Number is required')
        .isInt({ min:1, max: 20 })
        .withMessage('StepsNumber must be between 1 and 20 characters.'),
    body('description')
        .notEmpty()
        .withMessage('Description is required.')
        .isLength({ min:20 ,max:500})
        .withMessage('Description must be between 5 and 50 characters.'),
]