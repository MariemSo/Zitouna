import {Prisma} from "@prisma/client";

type IRecipe = Prisma.RecipeGetPayload<{}>

type StepInput = {
    stepNumber: number;
    description: string;
};

type IngredientInput = {
    quantity: number;
    unit: string;
    ingredientId: number;
};

type CategoryInput = number;

export { IngredientInput, CategoryInput ,StepInput,IRecipe };
