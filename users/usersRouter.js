const { Router } = require("express");

const usersRouter = Router();

const auth = require("../auth/authMiddleware");
const uploads = require("../multer/multerMiddleware");
const {
  registerValidation,
  loginValidation,
  updateValidation,
} = require("../validation/validationMiddleware");
const usersController = require("./usersController");

usersRouter.get("/", usersController.getAllUsers);

usersRouter.get("/:id", usersController.getUserById);

usersRouter.post(
  "/register",
  uploads.single("userImg"),
  registerValidation,
  usersController.createUser,
);

usersRouter.post("/login", loginValidation, usersController.loginUser);

usersRouter.patch(
  "/me",
  auth,
  uploads.single("userImg"),
  updateValidation,
  usersController.updateUser,
);

module.exports = usersRouter;
