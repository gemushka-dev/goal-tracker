const { Router } = require("express");

const auth = require("../auth/authMiddleware");
const { createGoalValidation } = require("../validation/validationMiddleware");
const goalsController = require("./goalsController");

const goalsRouter = Router();

goalsRouter.get("/", goalsController.getAllGoals);

goalsRouter.get("/me", auth, goalsController.getAllGoalsByUserId);

goalsRouter.post(
  "/create",
  auth,
  createGoalValidation,
  goalsController.createGoal,
);

goalsRouter.delete("/:id", auth, goalsController.deleteGoal);

goalsRouter.get("/user/:id", goalsController.getGoalsByUserId);

goalsRouter.get("/:id", goalsController.getGoalById);

module.exports = goalsRouter;
