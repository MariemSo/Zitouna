import prisma from "../prisma/prisma";
import {Request, Response} from "express";
import {
    createRecipeService,
    deleteRecipeService,
    getRecipeByIdService,
    updateRecipeService
} from "../services/recipeServices";

const createRecipe = async (req: Request, res: Response) => {

    const userId = req.user?.id;
    if (!userId) {
        res.status(400).send({message: "User does not exist"});
        return;
    }
    const user = await prisma.user.findUnique({where: {id: userId},});

    if (!user || (user.role == 'USER')) {
        res.status(400).send({message: 'Permission denied'});
        return;
    }

    try {
        const recipeData  = req.body;
        const recipe = await createRecipeService(userId,recipeData)

        res.status(201).json({message: "Recipe Created Successfully", recipe});
    } catch (err:any) {
        console.error("Error creating recipe:", err.message);
        res.status(400).send({message: "Error in Creating Recipe", err});
    }

}

export const getRecipeById = async (req: Request, res: Response) => {
    try {
        let recipeId = parseInt(req.params.id)

        if (isNaN(recipeId)) {
            res.status(400).json({error: "Invalid recipe ID"});
            return;
        }
        const oneRecipe = await getRecipeByIdService(recipeId)
        if (!oneRecipe) {
            res.status(404).json({error: "No recipe found"});
            return;
        }
        console.log(oneRecipe)

        res.status(200).json({message: "Recipe Successfully Retrieved", oneRecipe});
    } catch (err) {
        res.status(500).json({message: "An error occurred while fetching the recipe", err});
        return;
    }
}

export const getAllRecipes = async (_req: Request, res: Response) => {
    try {
        const recipes = await prisma.recipe.findMany();
        if (recipes.length === 0) {
            res.status(404).json({error: "No recipes found"});
        }
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({error: "Error in Fetching All Recipes", err});
    }
};

const updateRecipe = async (req: Request, res: Response) => {

    const userId = req.user?.id;
    const recipeId = parseInt(req.params.id)

    try {
        if(!userId){
            res.status(400).json({error: "Access Denied"});
            return;
        }
        if (isNaN(recipeId)) {
            res.status(400).json({error: "Invalid recipe ID"});
            return;
        }

        const input = req.body;
        const updatedRecipe = await updateRecipeService(recipeId,userId,input)

        res.status(200).json({message: "Recipe Updated Successfully", updatedRecipe});
    } catch (err) {
        res.status(400).json({error: "Error in Updating Recipe", err});
        return;
    }
}

const deleteRecipe = async (req: Request, res: Response) => {

    const userId = req.user?.id;
    const recipeId = parseInt(req.params.id)

    try {
        if (!userId) {
            res.status(401).json({success: false, message: 'Access Denied'});
            return;
        }

        if (isNaN(recipeId)) {
            res.status(400).json({error: "Invalid recipe ID"});
            return;
        }

        if (!recipeId) {
            res.status(404).json({error: "No recipe found"});
            return;
        }

        const recipeToDelete = await deleteRecipeService(recipeId,userId)

        res.status(200).json({message: "Recipe deleted successfully", recipeToDelete});
    } catch (err) {
        res.status(500).json({error: "Error in Deleting Recipe", err});
        return;
    }
}

export default {createRecipe, getRecipeById, getAllRecipes,updateRecipe,deleteRecipe};