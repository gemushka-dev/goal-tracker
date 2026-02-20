require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const usersRepo = require("./usersRepository");
const HttpError = require("../error/errorClass");

module.exports.getAllUsers = async () => usersRepo.getAllUsers();

module.exports.getUserById = async (userId) => {
  const user = await usersRepo.getUserById(userId);
  if (!user) {
    throw new HttpError("Not Found", 404);
  }
  return user;
};

module.exports.createUser = async ({
  username,
  userEmail,
  password,
  userImg,
}) => {
  const registredUser = await usersRepo.getUserByEmail(userEmail);
  if (registredUser && registredUser.user_id) {
    throw new HttpError("User already exists", 409);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return usersRepo.registerUser({
    username,
    userEmail,
    userImg,
    password: hashedPassword,
  });
};

module.exports.loginUser = async (user) => {
  const registredUser = await usersRepo.getUserByEmail(user.userEmail);
  if (!registredUser) {
    throw new HttpError("Unauthorized", 401);
  }
  const valid = await bcrypt.compare(user.password, registredUser.password);
  if (!valid) {
    throw new HttpError("Unauthorized", 401);
  }
  const token = jwt.sign(
    {
      role: "user",
      userId: registredUser.user_id,
    },
    process.env.SECRET,
    { expiresIn: "7d" },
  );
  return token;
};

module.exports.updateUser = async (userId, fields) => {
  const updateData = {};
  if (fields?.username) updateData.username = fields.username;
  if (fields?.userImg) updateData.user_img = fields.userImg;

  return usersRepo.updateUser(userId, updateData);
};
