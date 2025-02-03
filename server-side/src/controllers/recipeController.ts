import { Request, Response } from "express";
import {
  createRecipeService,
  deleteRecipeService,
  getRecipeByIdService,
  getAllRecipesService,
  updateRecipeService,
} from "../services/recipeServices";

const createRecipe = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized: User not logged in" });
    return;
  }
  try {
    const recipe = await createRecipeService(userId, req.body);
    res.status(201).json({success:true, message: "Recipe created successfully", recipe });
  } catch (err: any) {
    console.error("Error creating recipe:", err);
    const statusCode = err.code === "ERR400" ? 400 : 500;
    res.status(statusCode).json({ success: false, message: err.message });
  }
};

const getRecipeById = async (req: Request, res: Response) => {
    const recipeId = parseInt(req.params.id);
    if (isNaN(recipeId)) {
      {
        res.status(400).json({ success:false, message: "Invalid recipe ID" });
        return
      }
    }
  try {

    const recipe = await getRecipeByIdService(recipeId);
    if (!recipe) {
      res.status(404).json({success:false,message: "Recipe not found" });
      return
    }

    res.status(200).json({success:true, message: "Recipe retrieved successfully", recipe});

  } catch (err: any) {
    res.status(500).json({success:false, message: "Internal Server Error", error: err.message });
  }
};

const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await getAllRecipesService(req.query);
    if (!recipes.length) {
      res.status(404).json({ error: "No recipes found" });
      return 
    }
    res.status(200).json({ success: true, recipes });
  } catch (err: any) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({success:false, message: "Internal Server Error", error: err.message });
  }
};

const updateRecipe = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const recipeId = parseInt(req.params.id);
    if (!userId) {
      res.status(401).json({ success:false, message: "Unauthorized: User not logged in" });
      return
    }
    if (isNaN(recipeId)) {
      res.status(400).json({ success:false,message: "Invalid recipe ID" });
      return
    }
  try {
    const updatedRecipe = await updateRecipeService(recipeId, userId, req.body);
    {
      res
        .status(200)
        .json({success:true, message: "Recipe updated successfully", updatedRecipe });
    }
  } catch (err: any) {
    console.error("Error updating recipe:", err);
    res.status(500).json({success:false, message: "Internal Server Error", error: err.message });
  }
};

const deleteRecipe = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const recipeId = parseInt(req.params.id);

    if (!userId) {
      res.status(401).json({success:false, message: "Unauthorized" });
      return
    }
    if (isNaN(recipeId)) {
      res.status(400).json({success:false, message: "Invalid recipe ID" });
      return
    }
  try {
    await deleteRecipeService(recipeId, userId);
    res.status(200).json({success:true, message: "Recipe deleted successfully" });
  } catch (err: any) {
    res.status(500).json({success:false, message: "Internal Server Error", error: err.message });
  }
};

export default { createRecipe, getRecipeById, getAllRecipes, updateRecipe, deleteRecipe };
