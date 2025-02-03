import { PrismaClient } from "@prisma/client";
import {throwError} from "../utils/serviceUtils";

const prisma = new PrismaClient();

const getAllIngredientsService = async (query: any) => {
    try {
        const { search } = query;
        return await prisma.ingredient.findMany({
            where: search ? { name: { contains: search, mode: "insensitive" } } : {},
        });
    } catch (error) {
        console.error("Error fetching ingredients:", error);
        throwError("Database error while retrieving ingredients", "ERR500");
    }
};

const addIngredientService = async (name: string, icon: string) => {
    try {
        const normalizedName = name.toLowerCase().trim();

        const existingIngredient = await prisma.ingredient.findFirst({
            where: { normalizedName},
        });
        if (existingIngredient) {
            throwError(`Ingredient '${existingIngredient.name}' already exists`, "ERR400");
        }

        return await  prisma.ingredient.create({
            data: {
                name:name.trim(),
                normalizedName,
                icon: icon || "default-icon.png",
            },
        });

    } catch (error) {
        console.error("Error adding ingredient:", error);
        throwError("Database error while adding the ingredient", "ERR500")
    }
};

const removeIngredientFromRecipeService = async (recipeId: number, recipeIngredientId: any, userId: number) => {
    try {
        const idIngredientToDelete = parseInt(recipeIngredientId, 10);
        if (isNaN(idIngredientToDelete)) {
            throwError("Invalid ingredient ID", "ERR400");
        }

        const recipe = await prisma.recipe.findUnique({
            where: { id: recipeId },
            select: { createdBy: true }
        });

        if (!recipe) {
            throwError("Recipe not found","ERR400");
        }

        if (recipe && recipe.createdBy !== userId) {
            throwError("Forbidden: Only the recipe creator can modify its ingredients", "ERR403");
        }

        const existingRelation = await prisma.recipeIngredients.findUnique({
            where: { id: idIngredientToDelete }
        });

        if (!existingRelation || existingRelation.recipeId !== recipeId) {
            throwError("Ingredient is not part of this recipe", "ERR400");
        }

        await prisma.recipeIngredients.delete({
            where: { id: existingRelation?.id }
        });

        return {success:true, message: "Ingredient successfully removed from recipe" };
    } catch (error: any) {
        console.error("Error removing ingredient from recipe:", error.message);
        throw error;
    }
};

const deleteIngredientService = async (ingredientId: number) => {
    try {
        const ingredient = await prisma.ingredient.findUnique({
            where: { id: ingredientId },
        });

        if (!ingredient) {
            throwError("Ingredient not found","ERR404");
        }

        return await prisma.ingredient.delete({ where: { id: ingredientId } });
    } catch (error) {
        console.error("Error deleting ingredient:", error);
        throwError("Database error while deleting the ingredient", "ERR500");
    }
};

export {
    getAllIngredientsService,
    addIngredientService,
    removeIngredientFromRecipeService,
    deleteIngredientService,
};
