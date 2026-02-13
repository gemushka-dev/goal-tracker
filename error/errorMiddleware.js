const { ZodError } = require("zod");

module.exports = (err, req, res, next) => {
  console.log(`[ERROR] ${err}`);
  if (err instanceof ZodError) {
    return res.status(400).json({ error: 400, message: "Validation error" });
  }

  switch (err.message) {
    case "Unauthorized":
      return res.status(401).json({ error: 401, message: err.message });
    case "Invalid Field":
      return res.status(400).json({ error: 400, message: err.message });
    case "No fields to update":
      return res.status(400).json({ error: 400, message: err.message });
    case "Bad Request":
      return res.status(400).json({ error: 400, message: err.message });
    case "User already exists":
      return res.status(409).json({ error: 409, message: err.message });
    case "Not Found":
      return res.status(404).json({ error: 404, message: err.message });
  }

  res.status(500).json({ error: 500, message: "Internal Server Error" });
};
