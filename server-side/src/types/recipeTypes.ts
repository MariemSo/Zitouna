import {Prisma} from "@prisma/client";

type IRecipe = Omit<Prisma.RecipeGetPayload<{}>, 'createdAt'>;

interface  FullRecipe {
    name: string,
    coverImage: string,
    prepTime: number,
    spiciness: number,
    categoryId: number,
    createdBy:number,
    steps:StepInput[],
    ingredients: IngredientInput[],
}

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


export { IngredientInput, CategoryInput ,StepInput,IRecipe,FullRecipe };
