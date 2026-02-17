const likesRepository = require("./likesRepository");

module.exports.getGoalLikes = async (goalId) =>
  likesRepository.getGoalLikes(goalId);

module.exports.getCommentLikes = async (commentId) =>
  likesRepository.getCommentLikes(commentId);

module.exports.createGoalLike = async (userId, goalId) =>
  likesRepository.createGoalLike(userId, goalId);

module.exports.createCommentLike = async (userId, commentId) =>
  likesRepository.createCommentLike(userId, commentId);
