import { body } from "express-validator";

const stepValidation = [
  body("steps")
    .isArray({ min: 1 })
    .withMessage("Steps must be an array with at least one step."),
  body("steps.*.stepNumber")
    .isInt({ gt: 0 })
    .withMessage("Each Recipe must have at least one Step."),
  body("steps.*.description")
    .isString()
    .notEmpty()
    .withMessage("Each step must have a description."),
];

const ingredientValidation = [
  body("ingredients")
    .isArray({ min: 1 })
    .withMessage("Ingredients must be an array with at least one ingredient."),
  body("ingredients.*.ingredientId")
    .isInt({ gt: 0 })
    .withMessage("Each ingredient must have a valid ingredientId."),
  body("ingredients.*.quantity")
    .isInt({ gt: 0 })
    .withMessage("Each ingredient must have a quantity greater than 0."),
  body("ingredients.*.unit")
    .isString()
    .notEmpty()
    .withMessage("Each ingredient must have a unit."),
];

const createRecipeValidator = [
  body("name").isString().notEmpty().withMessage("Recipe name is required."),
  body("coverImage")
    .optional()
    .isString()
    .withMessage("Cover image must be a valid string."),
  body("prepTime")
    .isInt({ gt: 0 })
    .withMessage("Prep time must be a positive integer."),
  body("spiciness")
    .isInt({ min: 0, max: 5 })
    .withMessage("Spiciness must be between 0 and 5."),
  body("categoryId")
    .isInt({ gt: 0 })
    .withMessage("Category ID must be a positive integer."),
  ...stepValidation,
  ...ingredientValidation,
];

const updateRecipeValidator = [
  body("name")
    .optional()
    .isString()
    .withMessage("Recipe name must be a string."),
  body("coverImage")
    .optional()
    .isString()
    .withMessage("Cover image must be a valid string."),
  body("prepTime")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Prep time must be a positive integer."),
  body("spiciness")
    .optional()
    .isInt({ min: 0, max: 5 })
    .withMessage("Spiciness must be between 0 and 5."),
  body("categoryId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Category ID must be a positive integer."),
  ...stepValidation,
  ...ingredientValidation,
];

export { createRecipeValidator, updateRecipeValidator };
