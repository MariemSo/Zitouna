import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateNormalizedNames = async () => {
    try {
        const ingredients = await prisma.ingredient.findMany();

        for (const ingredient of ingredients) {
            if (!ingredient.normalizedName) {
                await prisma.ingredient.update({
                    where: { id: ingredient.id },
                    data: {
                        normalizedName: ingredient.name.toLowerCase().trim(),
                    },
                });
            }
        }

        console.log("✅ All ingredients updated with normalized names!");
    } catch (error) {
        console.error("❌ Error updating ingredients:", error);
    } finally {
        await prisma.$disconnect();
    }
};

updateNormalizedNames();
