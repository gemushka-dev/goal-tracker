require("dotenv").config();
const jwt = require("jsonwebtoken");

const database = require("../database/databaseInit");

module.exports = async (req, res) => {
  try {
    const payload = jwt.verify(req.cookies.access_token, process.env.SECRET);
    const answer = await database.getUserById(payload.userId);
    payload.userInfo = answer;
    res.status(200).json(payload);
  } catch (e) {
    res.status(401).json({ error: 401, message: "Not Authenticated" });
  }
};
