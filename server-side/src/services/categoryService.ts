import prisma from "../prisma/prisma";

export const getAllCategories =  () => {
    return prisma.category.findMany();
};
