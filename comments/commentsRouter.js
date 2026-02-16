const { Router } = require("express");

const {
  createCommentValidation,
} = require("../validation/validationMiddleware");
const auth = require("../auth/authMiddleware");
const commentsController = require("./commentsController");

const commentsRouter = Router();

commentsRouter.get("/goals/:id", commentsController.getCommentsByGoalId);

commentsRouter.get("/parent/:id", commentsController.getCommentsByParentId);

commentsRouter.post(
  "/goals/:id",
  auth,
  createCommentValidation,
  commentsController.createCommentToGoal,
);

commentsRouter.post(
  "/parent/:id",
  auth,
  createCommentValidation,
  commentsController.createCommentToComment,
);

commentsRouter.delete("/:id", auth, commentsController.deleteComment);

module.exports = commentsRouter;
