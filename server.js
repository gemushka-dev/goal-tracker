const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const database = require("./database/databaseInit");

const app = express();

const PORT = 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http:127.0.0.1:5500",
    credentials: true,
  }),
);
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

async function start() {
  try {
    database.init();
    app.listen(PORT, () => {
      console.log(`Server listens on ${PORT} port.`);
    });
  } catch (e) {
    console.log(`Something went wrong.Error: ${e.message}`);
    process.exit(1);
  }
}

start();
