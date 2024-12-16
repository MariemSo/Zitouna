import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoutes from "./Routes/userRoutes";
import recipesRouter from "./Routes/recipeRoutes";
import commentsRouter from "./Routes/commentRoutes";

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipesRouter);
app.use("/api/recipes/:recipeId/comments", commentsRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: error.message });
});

export default app;
