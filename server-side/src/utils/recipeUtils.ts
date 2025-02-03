import { StepInput, IngredientInput } from "../types/recipeTypes";

export const updateRecipeMetadata = async (prisma:any, recipeId:number, input:any) => {
    await prisma.recipe.update({
        where: { id: recipeId },
        data: {
            name: input.name,
            coverImage: input.coverImage,
            prepTime: input.prepTime,
            spiciness: input.spiciness,
            categoryId: input.categoryId,
            updated_at: new Date(),
        },
    });
};

export const updateRecipeSteps = async (prisma:any, recipeId:number, steps: StepInput[]) => {
    if (steps && steps.length > 0) {
        await prisma.step.deleteMany({ where: { recipeId } });
        await prisma.step.createMany({
            data: steps.map((step) => ({
                recipeId,
                stepNumber: step.stepNumber,
                description: step.description,
            })),
        });
    }
};

export const updateRecipeIngredients = async (prisma:any, recipeId:number, ingredients: IngredientInput[]) => {
    if (ingredients && ingredients.length > 0) {
        await prisma.recipeIngredients.deleteMany({ where: { recipeId } });

        for (const ingredient of ingredients) {
            const existingIngredient = await prisma.recipeIngredients.findFirst({
                where: { recipeId, ingredientId: ingredient.ingredientId },
            });

            if (existingIngredient) {
                await prisma.recipeIngredients.update({
                    where: { id: existingIngredient.id },
                    data: { quantity: ingredient.quantity, unit: ingredient.unit },
                });
            } else {
                await prisma.recipeIngredients.create({
                    data: {
                        recipeId,
                        ingredientId: ingredient.ingredientId,
                        quantity: ingredient.quantity,
                        unit: ingredient.unit,
                    },
                });
            }
        }
    }
};
