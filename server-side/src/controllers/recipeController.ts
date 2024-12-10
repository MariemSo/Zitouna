import prisma from "../prisma/prisma";
import {Request, Response} from "express";
import {IngredientInput, StepInput} from "../types/recipeTypes";

const createRecipe = async (req: Request, res: Response) => {
    const {name, coverImage, prepTime, spiciness, steps, ingredients, categoryId} = req.body;

    const userId = req.user?.id;
    if (!userId) {
        res.status(400).send({message: "User does not exist"});
        return;
    }

    try {
        const user = await prisma.user.findUnique({where: {id: userId},});

        if (!user || (user.role == 'USER')) {
            res.status(403).json({error: 'Permission denied'});
            return;
        }

        const recipe = await prisma.recipe.create({
            data: {
                name,
                coverImage: coverImage || "default-image.jpg",
                prepTime,
                spiciness,
                createdBy: userId,
                categoryId,
                Step: {
                    create: steps.map((step: StepInput,) => ({
                        stepNumber: step.stepNumber,
                        description: step.description,
                    })),
                },
                ingredients: {
                    create: ingredients.map((ingredient: IngredientInput) => ({
                        ingredientId: ingredient.ingredientId,
                        quantity: ingredient.quantity,
                        unit: ingredient.unit,
                    })),
                },
            },
        });
        res.status(201).json({message: "Recipe Created Successfully", recipe});
    } catch (err) {
        res.status(400).send({message: "Error in Creating Recipe", err});
    }

}

export const getOneReById = async (req: Request, res: Response) => {
    try {

        let recipeId = parseInt(req.params.id)

        if (isNaN(recipeId)) {
            res.status(400).json({error: "Invalid recipe ID"});
            return;
        }

        const oneRecipe = await prisma.recipe.findUnique({
            where: {
                id: recipeId
            },
            include: {
                Step: true,
                ingredients: {
                    include: {ingredient: true}
                },
                category: true,
                user: {
                    select: {
                        userName: true,
                    },
                },
                Comment: true,
            }
        })
        if (!oneRecipe) {
            res.status(404).json({error: "No recipe found"});
            return;
        }

        res.status(200).json(oneRecipe);
    } catch (err) {
        res.status(500).json({message: "An error occurred while fetching the recipe", err});
        return;
    }
}

const updateRecipe = async (req: Request, res: Response) => {

    const userId = req.user?.id;
    const recipeId = parseInt(req.params.id)
    const {name, coverImage, prepTime, spiciness, categoryId} = req.body;

    try {
        if (!userId) {
            res.status(401).json({success: false, message: 'Access Denied'});
            return;
        }

        if (isNaN(recipeId)) {
            res.status(400).json({error: "Invalid recipe ID"});
            return;
        }

        const recipe = await prisma.recipe.findUnique({
            where: {id: recipeId}
        })

        if (!recipe) {
            res.status(404).json({error: "No recipe found"});
            return;
        } else if (recipe.createdBy !== userId) {
            res.status(403).json({error: "You are not authorized to update this recipe"});
            return;
        }

        const updatedRecipe = await prisma.recipe.update({
            where: {id: recipeId},
            data: {
                name,
                coverImage,
                prepTime,
                spiciness,
                categoryId,
            }
        })
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


        const recipeToDelete = await prisma.recipe.delete({
            where: {
                id: recipeId,
                createdBy: userId
            }
        })
        res.status(200).json({message: "Recipe deleted successfully", recipeToDelete});
    } catch (err) {
        res.status(500).json({error: "Error in Deleting Recipe", err});
        return;
    }
}

export default {createRecipe, getOneReById, updateRecipe,deleteRecipe};