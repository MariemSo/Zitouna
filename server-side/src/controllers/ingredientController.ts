import { Request, Response } from "express";
import {
    getAllIngredientsService,
    addIngredientService,
    deleteIngredientService,
    removeIngredientFromRecipeService,
} from "../services/ingredientServices";

const getAllIngredients = async (req: Request, res: Response) => {
    try {
        const ingredients = await getAllIngredientsService(req.query);
        res.status(200).json({ success: true, message: "ingredients retrieved successfully", ingredients });
        return
    } catch (err: any) {
        console.error("Error fetching ingredients:", err);
        res.status(500).json({success:false, message: "Internal Server Error", error: err.message });
        return
    }
};

const addIngredient = async (req: Request, res: Response) => {
        const { name, icon } = req.body;
        const userRole = req.user?.role;
        if (userRole === "USER") {
            res.status(403).json({ message: "Forbidden: You do not have permission to add ingredients." });
            return
        }

        if (!name) {
            res.status(400).json({success:false, message: "Ingredient name is required." });
            return
        }
    try {
        const ingredient = await addIngredientService(name, icon);
        res.status(201).json({success:true, message: "Ingredient added successfully", ingredient });
    } catch (error: any) {
        console.error("Error adding ingredient:", error);
        res.status(500).json({success:false, message: "Internal Server Error", error: error.message })
    }
};

export const removeIngredientFromRecipe = async (req: Request, res: Response) => {
    const { recipeId, recipeIngredientId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success:false, message: "Unauthorized: User not logged in" });
        return
    }
    try {
        const result = await removeIngredientFromRecipeService(Number(recipeId), parseInt(recipeIngredientId), userId);
        res
          .status(200)
          .json({
            success: true,
            message: "Ingredient removed from recipe successfully",
            result,
          });
        return
    } catch (error: any) {
        console.error("Error removing ingredient from recipe:", error.message);
        res.status(500).json({  success: false,error: error.message });
    }
};

const deleteIngredient = async (req: Request, res: Response)=> {
    const userRole = req.user?.role;
    const ingredientId = parseInt(req.params.id);

    if (userRole !== "ADMIN") {
        res.status(401).json( {success: false, message: "Forbidden: You do not have permission to delete ingredients" });
      return
    }
    try {
        await deleteIngredientService(ingredientId);
        res.status(200).json({success: true, message: "Ingredient deleted successfully" });
    } catch (err: any) {
        console.error("Error deleting ingredient:", err);
        res.status(403).json({success: false, message: err.message });
    }
};
export default { getAllIngredients, addIngredient,removeIngredientFromRecipe, deleteIngredient };
