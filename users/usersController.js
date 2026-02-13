const usersService = require("./usersService");

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await usersService.getUserById(id);
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const user = await usersService.createUser({
      ...req.body,
      userImg: req.file?.filename || null,
    });

    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const jwt = await usersService.loginUser(req.body);
    res.cookie("access_token", jwt, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Logged in" });
  } catch (e) {
    next(e);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await usersService.updateUser(req.payload.userId, {
      ...req.body,
      userImg: req.file?.filename,
    });
    res.status(200).json(updatedUser);
  } catch (e) {
    next(e);
  }
};
