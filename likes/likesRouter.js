const { Router } = require("express");

const auth = require("../auth/authMiddleware");
const likesController = require("./likesController");

const likesRouter = Router();

likesRouter.get("/goals/:id", likesController.getGoalLikes);

likesRouter.get("/comments/:id", likesController.getCommentLikes);

likesRouter.post("/goals/:id", auth, likesController.createGoalLike);

likesRouter.post("/comments/:id", auth, likesController.createCommentLike);

module.exports = likesRouter;
