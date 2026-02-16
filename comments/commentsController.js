const commentsService = require("./commentsSerivce");

module.exports.getCommentsByGoalId = async (req, res, next) => {
  try {
    const comments = await commentsService.getCommentsByGoalId(req.params.id);
    res.status(200).json(comments);
  } catch (e) {
    next(e);
  }
};

module.exports.getCommentsByParentId = async (req, res, next) => {
  try {
    const comments = await commentsService.getCommentsByParentId(req.params.id);
    res.status(200).json(comments);
  } catch (e) {
    next(e);
  }
};

module.exports.createCommentToComment = async (req, res, next) => {
  try {
    console.log(req.body);
    const createdComment = await commentsService.createCommentToComment({
      commentText: req.body.commentText,
      userId: req.payload.userId,
      parentId: req.params.id,
    });
    res.status(201).json(createdComment);
  } catch (e) {
    next(e);
  }
};

module.exports.createCommentToGoal = async (req, res, next) => {
  try {
    const createdComment = await commentsService.createCommentToGoal({
      commentText: req.body.commentText,
      userId: req.payload.userId,
      goalId: req.params.id,
    });
    res.status(201).json(createdComment);
  } catch (e) {
    next(e);
  }
};

module.exports.deleteComment = async (req, res, next) => {
  try {
    await commentsService.deleteComment(req.params.id, req.payload.userId);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
