const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ error: 401, message: "Not Authenticated" });
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    req.payload = payload;
    next();
  } catch (e) {
    res.status(401).json({ error: 401, message: "Invalid token" });
  }
};
