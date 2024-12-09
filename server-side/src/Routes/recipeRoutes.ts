import { Router } from "express";
import recipeController from "../controllers/recipeController";
import {authenticate} from "../middlewares/authMiddleware";
import {recipesCreationValidator} from "../middlewares/validators/recipeValidators/creationValidator";
import {validateRequest} from "../middlewares/validators/userValidators/validateRequest";
const recipesRouter = Router();


recipesRouter.post('/createRecipe',authenticate,recipesCreationValidator,validateRequest ,recipeController.createRecipe)
recipesRouter.get('/:id',recipeController.getOneReById);
recipesRouter.put('/:id',authenticate,recipesCreationValidator,validateRequest,recipeController.updateRecipe)

export default recipesRouter;