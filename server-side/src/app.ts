import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import recipesRouter from "./routes/recipeRoutes";

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to Zitouna Tunisian Food API!");
});
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipesRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: error.message });
});

export default app;
