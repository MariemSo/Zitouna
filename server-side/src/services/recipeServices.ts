import prisma from "../prisma/prisma";
import { FullRecipe, IngredientInput, StepInput } from "../types/recipeTypes";
import { Prisma } from "@prisma/client";
import {
  updateRecipeMetadata,
  updateRecipeSteps,
  updateRecipeIngredients
} from "../utils/recipeUtils";
import {throwError} from "../utils/serviceUtils";

const createRecipeService = async (userId: number, input: FullRecipe) => {
  try{

  const {name,coverImage, prepTime,spiciness, categoryId,steps, ingredients } = input;

  if(!name||!steps||!ingredients){
    throwError("Name, steps, and ingredients are required", "ERR400");
  }
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
  }catch(err) {
    console.error("Error creating recipe:", err);
    throwError("Database error while creating the recipe", "ERR500");
  }
};

const getRecipeByIdService = async (recipeId: number) => {
  try{
    return prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
      include: {
        steps: true,
        ingredients: {
          include: { ingredient: true },
        },
        category: true,
        user: {
          select: {
            userName: true,
          },
        },
      },
  });
  }catch (err: any) {
    console.error("Error Fetching recipe:", err);
    throwError("Database error while fetching recipe:", "ERR500");
  }
};

const getAllRecipesService = async (filters: any) => {
  try {
    const { category, name, likes } = filters;
    const whereFilters: Prisma.RecipeWhereInput = {};

    if (category) {
      const categoryData = await prisma.category.findFirst({ where: { name: category }, select: { id: true } });
      if (categoryData) whereFilters.categoryId = categoryData.id;
    }

    if (name) {
      whereFilters.name = { contains: name, mode: "insensitive" };
    }

    const orderBy = likes ? [{ likes: likes === "desc" ? "desc" : "asc" }] : undefined;

    return await prisma.recipe.findMany({ where: whereFilters, orderBy });
  } catch (err) {
    console.error("Error fetching recipes:", err);
    throw new Error("Database error while retrieving recipes");
  }
};

const updateRecipeService = async (
    recipeId: number,
    userId: number,
    input: FullRecipe
) => {
  try{
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      include: { steps: true, ingredients: true },
    });

    if (!recipe) {
      throwError("Recipe not found", "ERR404");
      return
    }
    if (recipe.createdBy !== userId)
      throwError(
        "Forbidden: Only the recipe creator can modify this recipe",
        "ERR403",
      );

    return prisma.$transaction(async (prisma) => {
      await updateRecipeMetadata(prisma, recipeId, input);
      await updateRecipeSteps(prisma, recipeId, input.steps);
      await updateRecipeIngredients(prisma, recipeId, input.ingredients);

      return prisma.recipe.findUnique({
        where: { id: recipeId },
        include: {
          steps: true,
          ingredients: { include: { ingredient: true } },
        },
      });
    });
  }catch (err: any) {
    console.error("Error updating recipe:", err);
    throwError("Database error while retrieving recipes","ERR500");
  }
};


const deleteRecipeService = async (recipeId: number, userId: number) => {
  try{
    const recipe = await prisma.recipe.findUnique({ where: { id: recipeId } });

    if (!recipe) {
      throwError("Recipe not found", "ERR404");
      return;
    }
    if (recipe.createdBy !== userId) throwError("Forbidden: Only the recipe creator can delete this recipe", "ERR403");

    return prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });
  }catch (err: any) {
    console.error("Error deleting recipe:", err);
    throwError("Database error while deleting the recipe", "ERR500");
  }
};

export {
  createRecipeService,
  getRecipeByIdService,
  getAllRecipesService,
  updateRecipeService,
  deleteRecipeService,
};