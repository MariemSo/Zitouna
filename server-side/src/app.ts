import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import commentsRouter from "./Routes/commentRoutes";
import recipesRouter from "./Routes/recipeRoutes";
import userRoutes from "./Routes/userRoutes";

const app = express();
//Middleware
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/recipe", recipesRouter);
app.use("/api/recipe/:recipeId/comment", commentsRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: error.message });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
