import { Router } from "express";
import {registerValidators} from "../middlewares/validators/userValidators/registerValidators";
import userController from "../controllers/userController";
import {validateRequest} from "../middlewares/validators/userValidators/validateRequest";
import {loginValidators} from "../middlewares/validators/userValidators/loginValidators";
import {authenticate} from "../middlewares/authMiddleware";
import {updateProfileValidators} from "../middlewares/validators/userValidators/updateValidators";

const userRoutes = Router();

userRoutes.post("/register",registerValidators,validateRequest,userController.register);
userRoutes.post("/login",loginValidators,validateRequest,userController.login);
userRoutes.get("/profile", authenticate,userController.getProfile);
userRoutes.put("/profile", authenticate,updateProfileValidators,validateRequest,userController.updateProfile);

export default userRoutes;
