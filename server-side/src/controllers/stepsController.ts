import {Request, Response} from "express";
import prisma from "../prisma/prisma";

const updateStep = async (req: Request, res: Response) => {

    const userId = req.user?.id;
    const recipeId = parseInt(req.params.recipeId)
    const stepId = parseInt(req.params.stepId)
    const {stepNumber, description} = req.body;

    try {
        if (!userId) {
            res.status(401).json({success: false, message: 'Access Denied'});
            return;
        }

        if (isNaN(recipeId) && !recipeId ) {
            res.status(400).json({error: "Invalid Recipe ID"})
            return;
        }
        if (!stepId && isNaN(stepId)) {
            res.status(400).json({error: "Invalid Step ID"})
            return;
        }

        const recipe = await prisma.recipe.findUnique({
            where: {
                id: recipeId,
                createdBy: userId
            }
        })

        if (!recipe) {
            res.status(404).json({error: "No recipe found"});
            return;
        }

        const step = await prisma.step.update({
            where: {
                recipeId,
                id:stepId
            },
            data:{
                stepNumber,
                description,
            }
        })

        res.status(200).json({message: "Step Updated Successfully", step});

    } catch (err) {
        res.status(400).json({error: "Error Updating Step", err});
    }

}

export default {updateStep}