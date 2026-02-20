const goalsRepo = require("./goalsRepository");
const HttpError = require("../error/errorClass");

module.exports.getAllGoals = async () => goalsRepo.getAllGoals();

module.exports.getGoalById = async (goalId) => {
  const goal = await goalsRepo.getGoalById(goalId);
  if (!goal) {
    throw new HttpError("Not Found", 404);
  }
  return goal;
};

module.exports.getGoalsByUserId = async (userId) =>
  goalsRepo.getGoalsByUserId(userId);

module.exports.getAllGoalsByUserId = async (userId) =>
  goalsRepo.getAllGoalsByUserId(userId);

module.exports.createGoal = async ({
  goalTitle,
  goalContent,
  status,
  userId,
}) => {
  const createdGoal = goalsRepo.createGoal({
    goalTitle,
    goalContent,
    status,
    userId,
  });
  return createdGoal;
};

module.exports.deleteGoal = async (goalId, userId) =>
  goalsRepo.deleteGoal(goalId, userId);
