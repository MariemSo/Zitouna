import { Router } from "express";
import commentController from "../controllers/commentController";
import { authenticate } from "../middlewares/authMiddleware";
import { commentValidator } from "../middlewares/validators/commentValidator";
import { validateRequest } from "../middlewares/validators/validateRequest";
import recipeController from "../controllers/recipeController";

const commentsRouter = Router({ mergeParams: true });
commentsRouter.get("/", commentController.getComments);
commentsRouter.post(
  "/",
  authenticate,
  commentValidator,
  validateRequest,
  commentController.postComment,
);

commentsRouter.put(
  "/:commentId",
  authenticate,
  commentValidator,
  validateRequest,
  commentController.editComment,
);

commentsRouter.delete("/:commentId",authenticate,commentController.deleteComment);
export default commentsRouter;
