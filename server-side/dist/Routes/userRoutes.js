"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerValidators_1 = require("../middlewares/validators/userValidators/registerValidators");
const userController_1 = __importDefault(require("../controllers/userController"));
const validateRequest_1 = require("../middlewares/validators/userValidators/validateRequest");
const loginValidators_1 = require("../middlewares/validators/userValidators/loginValidators");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const updateValidators_1 = require("../middlewares/validators/userValidators/updateValidators");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/", (req, res) => {
    res.json({ message: "User endpoint works!" });
});
userRoutes.post("/register", registerValidators_1.registerValidators, validateRequest_1.validateRequest, userController_1.default.register);
userRoutes.post("/login", loginValidators_1.loginValidators, validateRequest_1.validateRequest, userController_1.default.login);
userRoutes.get("/profile", authMiddleware_1.authenticate, userController_1.default.getProfile);
userRoutes.put("/profile", authMiddleware_1.authenticate, updateValidators_1.updateProfileValidators, validateRequest_1.validateRequest, userController_1.default.updateProfile);
exports.default = userRoutes;
//# sourceMappingURL=userRoutes.js.map