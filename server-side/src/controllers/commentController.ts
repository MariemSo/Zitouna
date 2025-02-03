import { Request, Response } from "express";
import {
  deleteCommentService,
  editCommentService,
  getCommentService,
  postCommentService,
} from "../services/commentService";

const postComment = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const recipeId = parseInt(req.params.recipeId);
  const { text } = req.body;

  if (!userId) {
    res.status(400).json({ success: false, message: "Unauthorized: User not logged in" });
    return;
  }
  try {
    const newComment = await postCommentService(text, userId, recipeId);
    res.status(201).json({
      success: true,
      message: "Comment Posted Successfully",
      newComment,
    });
  } catch (err) {
    console.error("Error posting comment",err);
    res.status(500).json({
      success: false,
      message: "Something went wrong in Post Comment",
      error: err,
    });
  }
};

const editComment = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const commentId = parseInt(req.params.commentId);
  const { text } = req.body;

    if (!userId) {
      res.status(400).json({ success: false, message: "Unauthorized: User not logged in" });
      return;
    }
  try {
    const editedComment = await editCommentService(userId, commentId, text);
    res.status(200).json({
      success: true,
      message: "Comment edited Successfully",
      editedComment,
    });
  } catch (err: any) {
    console.error("Error editing comment:", err);
    res.status(err.code === "ERR404" ? 404 : 500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

const getComments = async (req: Request, res: Response) => {
  const recipeId = parseInt(req.params.recipeId);

  try {
    const comments = await getCommentService(recipeId);

    res.status(200).json({
      success: true,
      message: "Comment fetched successfully  ",
      comments,
    });
  } catch (err) {
    console.error("Error fetching comments:",err);
    res.status(500).json({ success: false, message: "Error getting comments" });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const commentId = parseInt(req.params.commentId);
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized: User not logged in" });
      return;
    }
  try {
    const deletedComment = await deleteCommentService(commentId, userId);
    res.status(200).json({success: true, message: "Comment deleted successfully", deletedComment });
  } catch (err) {
    console.error("Error deleting comment:",err);
    res
      .status(500)
      .json({ success: false, message: "Error deleting comment", error: err });
  }
};
export default { postComment, editComment, getComments,deleteComment };
