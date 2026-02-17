const likesService = require("./likesService");

module.exports.getGoalLikes = async (req, res, next) => {
  try {
    const likes = await likesService.getGoalLikes(req.params.id);
    res.status(200).json(likes);
  } catch (e) {
    next(e);
  }
};

module.exports.getCommentLikes = async (req, res, next) => {
  try {
    const likes = await likesService.getCommentLikes(req.params.id);
    res.status(200).json(likes);
  } catch (e) {
    next(e);
  }
};

module.exports.createGoalLike = async (req, res, next) => {
  try {
    const result = await likesService.createGoalLike(
      req.payload.userId,
      req.params.id,
    );
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

module.exports.createCommentLike = async (req, res, next) => {
  try {
    const result = await likesService.createCommentLike(
      req.payload.userId,
      req.params.id,
    );
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};
