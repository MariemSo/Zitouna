import { Router } from "express";
import recipeController from "../controllers/recipeController";
import {authenticate} from "../middlewares/authMiddleware";
import {createRecipeValidator, updateRecipeValidator } from "../middlewares/validators/recipeValidator";
import {validateRequest} from "../middlewares/validators/validateRequest";
const recipesRouter = Router();


recipesRouter.post('/',authenticate,createRecipeValidator,validateRequest ,recipeController.createRecipe)
recipesRouter.get('/',recipeController.getAllRecipes)
recipesRouter.get('/:id',recipeController.getRecipeById);
recipesRouter.put('/:id',authenticate,updateRecipeValidator,validateRequest,recipeController.updateRecipe)
recipesRouter.delete('/:id',authenticate,recipeController.deleteRecipe);

export default recipesRouter;