const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("./users/user-router");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/uesrs", userRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
