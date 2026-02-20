const { ZodError } = require("zod");
const HttpError = require("./errorClass");

module.exports = (err, req, res, next) => {
  console.log(`[ERROR] ${err}`);
  if (err instanceof ZodError) {
    return res.status(400).json({ error: 400, message: "Validation error" });
  }
  if (err instanceof HttpError) {
    return res
      .status(err.statusCode)
      .json({ error: err.statusCode, message: err.message });
  }
  res.status(500).json({ error: 500, message: "Internal Server Error" });
};
