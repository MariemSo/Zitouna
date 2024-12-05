"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const recipeRoutes_1 = __importDefault(require("./Routes/recipeRoutes"));
const app = (0, express_1.default)();
//Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Zitouna Tunisian Food API!");
});
app.use("/api/users", userRoutes_1.default);
app.use("/api/recipes", recipeRoutes_1.default);
app.use((error, req, res, next) => {
    res.status(500).json({ error: error.message });
});
exports.default = app;
//# sourceMappingURL=app.js.map