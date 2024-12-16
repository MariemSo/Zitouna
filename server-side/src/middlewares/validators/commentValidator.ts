import { body } from "express-validator";

const commentValidator = body("text")
  .isString()
  .notEmpty()
  .withMessage("A comment must not be empty");

export { commentValidator };
