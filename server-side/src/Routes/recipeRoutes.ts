import { Router } from "express";

const recipesRouter = Router();

recipesRouter.get('/',(req, res) => {
    res.json({ message: "Recipes endpoint works!" });
});

export default recipesRouter;