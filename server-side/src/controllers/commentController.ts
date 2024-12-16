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

  try {
    if (!userId) {
      res.status(400).send({ success: false, message: "Access denied" });
      return;
    }
    const newComment = await postCommentService(text, userId, recipeId);
    if (!newComment) {
      res
        .status(400)
        .send({ success: false, message: "Error creating comment" });
      return;
    }
    res.status(200).send({
      success: true,
      message: "Comment Posted Successfully",
      newComment,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send({
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

  try {
    if (!userId) {
      res.status(400).send({ success: false, message: "Access Denied" });
      return;
    }

    const editedComment = await editCommentService(userId, commentId, text);
    if (!editedComment) {
      res
        .status(400)
        .send({ success: false, message: "Error editing comment" });
      return;
    }
    res.status(200).send({
      success: true,
      message: "Comment edited",
      editedComment,
    });
  } catch (err: any) {
    if (err.code) {
      res.status(400).send({
        success: false,
        message: err.message,
        error: err,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong in editing Comment",
      });
    }
  }
};

const getComments = async (req: Request, res: Response) => {
  const recipeId = parseInt(req.params.recipeId);

  try {
    const comments = await getCommentService(recipeId);

    res.status(200).send({
      success: true,
      message: "Comment successfully fetched ",
      comments,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send({ success: false, message: "Error getting comments" });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const commentId = parseInt(req.params.commentId);
  try {
    if (!userId) {
      res.status(400).send({ success: false, message: "Access Denied" });
      return;
    }
    const deletedComment = await deleteCommentService(commentId, userId);
    res.status(200).send({success: true, message: "Comment deleted", deletedComment });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .send({ success: false, message: "Error deleting comment", error: err });
  }
};
export default { postComment, editComment, getComments,deleteComment };
