const database = require("../database/databaseInit");

module.exports.getAllGoals = async () => database.getAllGoals();

module.exports.getGoalsByUserId = async (userId) =>
  database.getGoalsByUserId(userId);

module.exports.getAllGoalsByUserId = async (userId) =>
  database.getAllGoalsByUserId(userId);

module.exports.getGoalById = async (goalId) => database.getGoalById(goalId);

module.exports.createGoal = async ({
  goalTitle,
  goalContent,
  status,
  userId,
}) => database.createGoal({ goalTitle, goalContent, status, userId });

module.exports.deleteGoal = async (goalId, userId) =>
  database.deleteGoal(goalId, userId);
