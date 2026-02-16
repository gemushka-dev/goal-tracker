const database = require("../database/databaseInit");

module.exports.getCommentsByGoalId = async (goalId) =>
  database.getCommentsByGoalId(goalId);

module.exports.getCommentsByParentId = async (parentId) =>
  database.getCommentsByCommentId(parentId);

module.exports.getCommentById = async (commentId) =>
  database.getCommentById(commentId);

module.exports.createCommentToComment = async ({
  commentText,
  userId,
  goalId,
  parentId,
}) =>
  database.createCommentToComment({ commentText, userId, goalId, parentId });

module.exports.createCommentToGoal = async ({ commentText, userId, goalId }) =>
  database.createCommentToGoal({ commentText, userId, goalId });

module.exports.deleteComment = async (commentId, userId) =>
  database.deleteComment(commentId, userId);
