import prisma from "../prisma/prisma";
import {throwError} from "../utils/serviceUtils";

const userInputDetails =  {
  user: {
    select: {
      userName: true,
      role: true,
    },
  },
};

const postCommentService = async (
  text: string,
  userId: number,
  recipeId: number,
) => {
  try{
  return  await prisma.comment.create({
    data: {
      text,
      recipeId,
      userId,
    },
    include:userInputDetails
  });
  }catch(err){
    console.error("Error in postCommentService", err);
    throwError("Error creating comment", "ERR400");
  }
};

const editCommentService = async (
  userId: number,
  commentId: number,
  text: string,
) => {
  try{

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
      userId: userId,
    },
  });
  if (!comment) {
    throwError("Comment with this specific ID was not found", "ERR404");
  }
  return await prisma.comment.update({
    where: {
      id: commentId,
      userId: userId,
    },
    data: {
      text,
    },
    include:  userInputDetails
  });
  }catch(err){
    console.error("Error in editCommentService", err);
    throw err;
  }
};

const getCommentService = async (recipeId: number) => {
  try{ return  await  prisma.comment.findMany({
      where: {
        recipeId: recipeId,
      },
      include: userInputDetails
    });
  }catch(err){
    console.error("Error in getCommentService", err);
    throwError("Error Fetching Comments", "ERR500");
  }
};

const deleteCommentService = async (commentId: number, userId: number) => {
  try{
    const comment = await prisma.comment.findUnique({
      where: { id: commentId, userId: userId },
    });
    if (!comment) {
      throwError("Comment with this Specific ID was not found", "ERR404");
    }
    return await prisma.comment.delete({
      where: {
        id: commentId,
        userId: userId,
      },
    });
  }catch(err){
    console.error("Error in deleteCommentService", err);
    throw err;
  }
};
export {
  postCommentService,
  editCommentService,
  getCommentService,
  deleteCommentService,
};
