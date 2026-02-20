const commentsRepository = require("./commentsRepository");
const HttpError = require("../error/errorClass");

module.exports.getCommentsByGoalId = async (goalId) =>
  commentsRepository.getCommentsByGoalId(goalId);

module.exports.getCommentsByParentId = async (parentId) =>
  commentsRepository.getCommentsByParentId(parentId);

module.exports.createCommentToComment = async ({
  commentText,
  userId,
  parentId,
}) => {
  const goalId = await commentsRepository.getCommentById(parentId);
  console.log(goalId);

  return commentsRepository.createCommentToComment({
    commentText,
    userId,
    goalId: goalId.goal_id,
    parentId,
  });
};

module.exports.createCommentToGoal = async ({ commentText, userId, goalId }) =>
  commentsRepository.createCommentToGoal({ commentText, userId, goalId });

module.exports.deleteComment = async (commentId, userId) => {
  const result = await commentsRepository.deleteComment(commentId, userId);
  if (!result) {
    throw new HttpError("Forbidden", 403);
  }
  return result;
};
