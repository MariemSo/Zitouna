/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[normalizedName]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "normalizedName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_normalizedName_key" ON "Ingredient"("normalizedName");
