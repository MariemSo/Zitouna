import { body } from "express-validator";

const emailValidator = body("email")
  .isEmail()
  .withMessage("Valid email is required.")
  .normalizeEmail();

const userNameValidator = body("userName")
  .optional()
  .trim()
  .isLength({ min: 3, max: 60 })
  .withMessage("Username must be between 3 and 50 characters long.");

const firstNameValidator = body("firstName")
  .notEmpty()
  .withMessage("First name is required.")
  .isLength({ min: 1, max: 30 })
  .withMessage("First name must be between 1 and 30 characters long.");

const lastNameValidator = body("lastName")
  .notEmpty()
  .withMessage("Last name is required.")
  .isLength({ min: 1, max: 30 })
  .withMessage("Last name must be between 1 and 30 characters long.");

const passwordValidator = body("password")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters long.")
  .matches(/\d/)
  .withMessage("Password must contain at least one number.");

const addressValidator = body("address")
  .optional()
  .trim()
  .isLength({ max: 255 })
  .withMessage("Address cannot exceed 255 characters.");

const phoneNumberValidator = body("phoneNumber")
  .optional()
  .isNumeric()
  .withMessage("Phone number must be numeric.")
  .isLength({ min: 7, max: 15 })
  .withMessage("Phone number must be between 7 and 15 digits.");

export const updateProfileValidators = [
  userNameValidator,
  firstNameValidator.optional(),
  lastNameValidator.optional(),
  addressValidator,
  phoneNumberValidator,
];

export const registerValidators = [
  emailValidator,
  userNameValidator,
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
  addressValidator,
  phoneNumberValidator,
];

export const loginValidators = [emailValidator, passwordValidator];
