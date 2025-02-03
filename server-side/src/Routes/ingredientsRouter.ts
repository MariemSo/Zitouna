import { Router } from "express";
import ingredientController from "../controllers/ingredientController";
import { authenticate } from "../middlewares/authMiddleware";

const ingredientsRouter = Router();

ingredientsRouter.get("/", ingredientController.getAllIngredients);
ingredientsRouter.post("/", authenticate, ingredientController.addIngredient);
ingredientsRouter.delete("/:id", authenticate, ingredientController.deleteIngredient);
ingredientsRouter.delete(
    "/recipe/:recipeId/ingredient/:recipeIngredientId", authenticate,
    ingredientController.removeIngredientFromRecipe
);
export default ingredientsRouter;
