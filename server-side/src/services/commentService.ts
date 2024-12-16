import prisma from "../prisma/prisma";

const postCommentService = async (
  text: string,
  userId: number,
  recipeId: number,
) => {
  return prisma.comment.create({
    data: {
      text,
      recipeId,
      userId,
    },
    include: {
      user: {
        select: {
          userName: true,
          role: true,
        },
      },
    },
  });
};

const editCommentService = async (
  userId: number,
  commentId: number,
  text: string,
) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
      userId: userId,
    },
  });
  if (!comment) {
    const error: any = new Error("Comment with this Specific ID was not found");
    error.code = "ERR404";
    throw error;
  }
  return prisma.comment.update({
    where: {
      id: commentId,
      userId: userId,
    },
    data: {
      text,
    },
    include: {
      user: {
        select: {
          userName: true,
          role: true,
        },
      },
    },
  });
};

const getCommentService = async (recipeId: number) => {
  const comments = prisma.comment.findMany({
    where: {
      recipeId: recipeId,
    },
    include: {
      user: {
        select: {
          userName: true,
          role: true,
        },
      },
    },
  });

  if (!comments) {
    throw new Error("No comments Found");
  }
  return comments;
};

const deleteCommentService = async (commentId: number, userId: number) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId, userId: userId },
  });
  if (!comment) {
    throw new Error("Comment with this Specific ID was not found");
  }
  return prisma.comment.delete({
    where: {
      id: commentId,
      userId: userId,
    },
  });
};
export {
  postCommentService,
  editCommentService,
  getCommentService,
  deleteCommentService,
};
