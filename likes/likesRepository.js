const database = require("../database/databaseInit");

module.exports.getGoalLikes = async (goalId) => database.getGoalLikes(goalId);

module.exports.getCommentLikes = async (commentId) =>
  database.getCommentLikes(commentId);

module.exports.createGoalLike = async (userId, goalId) =>
  database.createGoalLike({ userId, goalId });

module.exports.createCommentLike = async (userId, commentId) =>
  database.createCommentLike({ userId, commentId });
