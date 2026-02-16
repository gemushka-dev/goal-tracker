const { z } = require("zod");

const registerSchema = z.object({
  username: z
    .string({ message: "Incorrect username type" })
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(64, { message: "Username must be at max 64 characters long" }),
  userEmail: z.email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Incorrect password type" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const loginSchema = z.object({
  userEmail: z.email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Incorrect password type" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const updateSchema = z.object({
  username: z
    .string({ message: "Incorrect username type" })
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(64, { message: "Username must be at max 64 characters long" }),
});

const creatGoalSchema = z.object({
  goalTitle: z
    .string({ message: "Incorrect goal title type" })
    .min(3, { message: "Goal title must be at least 3 characters long" })
    .max(128, { message: "Goal title must be at max 64 characters long" }),
  goalContent: z.string({ message: "Incorrect goal content type" }),
  status: z.enum(["public", "private"]).default("private"),
});

const createCommentSchema = z.object({
  commentText: z
    .string({ message: "Incorrect text type" })
    .min(1, { message: "Text must be at least 1 character long" }),
});

module.exports.registerValidation = (req, res, next) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports.loginValidation = (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports.updateValidation = (req, res, next) => {
  try {
    const validatedData = updateSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports.createGoalValidation = (req, res, next) => {
  try {
    const validatedData = creatGoalSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports.createCommentValidation = (req, res, next) => {
  try {
    const validatedData = createCommentSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (e) {
    next(e);
  }
};
