import prisma from "../prisma/prisma";
import {FullRecipe, IngredientInput, IRecipe, StepInput} from "../types/recipeTypes";


const createRecipeService = async  (userId:number ,input: FullRecipe)=>{
    const { name,coverImage,prepTime,spiciness,categoryId,steps,ingredients} = input;

    return prisma.recipe.create({
        data: {
            name,
            coverImage: coverImage || "default-image.jpg",
            prepTime,
            spiciness,
            createdBy: userId,
            categoryId,
            steps: {
                create: steps.map((step: StepInput) => ({
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
}

const getRecipeByIdService = async  (recipeId:number)=>{
    return  prisma.recipe.findUnique({
        where: {
            id: recipeId
        },
        include: {
            steps: true,
            ingredients: {
                include: {ingredient: true}
            },
            category: true,
            user: {
                select: {
                    userName: true,
                },
            }
        }
    })
}

const updateRecipeService = async  (recipeId:number, userId:number, input:FullRecipe)=>{
    const {name, coverImage, prepTime, spiciness, categoryId, steps, ingredients} = input;

    const recipe = await prisma.recipe.findUnique({
        where: {id: recipeId}
    })

    if (!recipe) {
        throw new Error("No recipe found");
    } else if (recipe.createdBy !== userId) {
        throw new Error ( "You are not authorized to update this recipe");
    }

    const updatedRecipe= await  prisma.recipe.update({
        where: {id: recipeId},
        data: {
            name,
            coverImage,
            prepTime,
            spiciness,
            categoryId,
        }
    })

    // Update steps
    if (steps && steps.length > 0) {
        await prisma.step.deleteMany({
            where: { recipeId },
        });

        await prisma.step.createMany({
            data: steps.map((step: StepInput) => ({
                recipeId,
                stepNumber: step.stepNumber,
                description: step.description,
            })),
        });
    }

    if (ingredients && ingredients.length > 0) {
        await prisma.recipeIngredients.deleteMany({
            where: { recipeId },
        });

        await prisma.recipeIngredients.createMany({
            data: ingredients.map((ingredient: IngredientInput) => ({
                recipeId,
                ingredientId: ingredient.ingredientId,
                quantity: ingredient.quantity,
                unit: ingredient.unit,
            })),
        });
    }

    return updatedRecipe
}

const deleteRecipeService = async  (recipeId:number, userId:number) =>{
    return prisma.recipe.delete({
        where: {
            id: recipeId,
            createdBy: userId
        }
    })
}


export {createRecipeService, getRecipeByIdService,updateRecipeService, deleteRecipeService}