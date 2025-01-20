import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import recipesRouter from "./routes/recipeRoutes";
import commentsRouter from "./routes/commentRoutes";
import swaggerDocs from "./docs/swaggerDocs";
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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
