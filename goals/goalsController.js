const goalsService = require("./goalsService");

module.exports.getAllGoals = async (req, res, next) => {
  try {
    const goals = await goalsService.getAllGoals();
    res.status(200).json(goals);
  } catch (e) {
    next(e);
  }
};

module.exports.getGoalById = async (req, res, next) => {
  try {
    const goal = await goalsService.getGoalById(req.params.id);
    res.status(200).json(goal);
  } catch (e) {
    next(e);
  }
};

module.exports.getGoalsByUserId = async (req, res, next) => {
  try {
    const goals = await goalsService.getGoalsByUserId(req.params.id);
    res.status(200).json(goals);
  } catch (e) {
    next(e);
  }
};

module.exports.getAllGoalsByUserId = async (req, res, next) => {
  try {
    const goals = await goalsService.getAllGoalsByUserId(req.payload.userId);
    res.status(200).json(goals);
  } catch (e) {
    next(e);
  }
};

module.exports.createGoal = async (req, res, next) => {
  try {
    const goal = {
      ...req.body,
      userId: req.payload.userId,
    };
    const createdGoal = await goalsService.createGoal(goal);
    res.status(201).json(createdGoal);
  } catch (e) {
    next(e);
  }
};

module.exports.deleteGoal = async (req, res, next) => {
  try {
    await goalsService.deleteGoal(req.params.id, req.payload.userId);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
