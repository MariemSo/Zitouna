import { Router } from "express";
import userController from "../controllers/userController";
import { validateRequest } from "../middlewares/validators/validateRequest";
import { authenticate } from "../middlewares/authMiddleware";
import {
  loginValidators,
  registerValidators,
  updateProfileValidators,
} from "../middlewares/validators/userValidators";

const userRoutes = Router();

userRoutes.post(
  "/register",
  registerValidators,
  validateRequest,
  userController.register,
);
userRoutes.post(
  "/login",
  loginValidators,
  validateRequest,
  userController.login,
);
userRoutes.get("/profile", authenticate, userController.getProfile);
userRoutes.put(
  "/profile",
  authenticate,
  updateProfileValidators,
  validateRequest,
  userController.updateProfile,
);

export default userRoutes;
