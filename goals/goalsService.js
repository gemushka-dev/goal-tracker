const goalsRepo = require("./goalsRepository");

module.exports.getAllGoals = async () => goalsRepo.getAllGoals();

module.exports.getGoalById = async (goalId) => {
  const goal = await goalsRepo.getGoalById(goalId);
  if (!goal) {
    throw new Error("Not Found");
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
