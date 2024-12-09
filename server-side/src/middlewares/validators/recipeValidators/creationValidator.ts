import {body} from "express-validator"
import { IngredientInput ,StepInput } from "../../../types/recipeTypes"

const recipesCreationValidator =[
    body('name')
        .notEmpty()
        .withMessage('Recipe name is required.')
        .isLength({ min: 3, max: 50 })
        .withMessage('Recipe name must be between 3 and 50 characters.'),
    body('coverImage')
        .optional()
        .isURL()
        .withMessage('Cover image must be a valid URL.'),
    body('prepTime')
        .notEmpty()
        .withMessage('Preparation time is required.')
        .isInt({ min: 1 })
        .withMessage('Preparation time must be a positive integer.'),
    body('spiciness')
        .optional()
        .isInt({ min: 0, max: 10 })
        .withMessage('Spiciness must be an integer between 0 and 10.'),
    body('steps')
        .optional()
        .isArray()
        .withMessage('Steps must be an array.')
        .custom((steps:StepInput[]) => {
            if (!steps.every((step) => step.stepNumber && step.description)) {
                throw new Error('Each step must include a stepNumber and a description.');
            }
            return true;
        }),
    body('ingredients')
        .optional()
        .isArray()
        .withMessage('Ingredients must be an array.')
        .custom((ingredients:IngredientInput[]) => {
            if (!ingredients.every((ingredient) => ingredient.quantity && ingredient.unit && ingredient.ingredientId)) {
                throw new Error('Each ingredient must include quantity, unit, and ingredientId.');
            }
            return true;
        }),
    body('categories')
        .optional()
        .isArray()
        .withMessage('Categories must be an array of IDs.')
];

export { recipesCreationValidator };
