const database = require("../database/databaseInit");

module.exports.getAllUsers = async () => await database.getAllUsers();

module.exports.getUserById = async (userId) =>
  await database.getUserById(userId);

module.exports.getUserByEmail = async (email) =>
  await database.getUserByEmail(email);

module.exports.registerUser = async ({
  username,
  userEmail,
  password,
  userImg,
}) => await database.createUser({ username, userEmail, password, userImg });

module.exports.updateUser = async (userId, obj) =>
  await database.updateUser(userId, obj);
