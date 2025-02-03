import { Router } from "express";
import recipeController from "../controllers/recipeController";
import { authenticate } from "../middlewares/authMiddleware";
import {
  createRecipeValidator,
  updateRecipeValidator,
} from "../middlewares/validators/recipeValidator";
import { validateRequest } from "../middlewares/validators/validateRequest";
import {requireRole} from "../middlewares/roleMiddleware";

const recipesRouter = Router();


recipesRouter.post(
    "/",
    authenticate,
    requireRole(["PREMIUM", "ADMIN"]),
    createRecipeValidator,
    validateRequest,
    recipeController.createRecipe
);


recipesRouter.get("/", recipeController.getAllRecipes);
recipesRouter.get("/:id", recipeController.getRecipeById);


recipesRouter.put(
    "/:id",
    authenticate,
    requireRole(["PREMIUM", "ADMIN"]),
    updateRecipeValidator,
    validateRequest,
    recipeController.updateRecipe
);

recipesRouter.delete(
    "/:id",
    authenticate,
    requireRole(["PREMIUM", "ADMIN"]),
    recipeController.deleteRecipe
);

export default recipesRouter;
