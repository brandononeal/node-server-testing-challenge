const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

const User = require("./users/user-model");

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.post("/users", validateUser, (req, res) => {
  User.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

server.delete("/users/:id", validateUserId, (req, res) => {
  User.remove(req.params.id)
    .then(() => {
      res.status(200).json(`User ${req.params.id} has been removed`);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

function validateUser(req, res, next) {
  if (!req.body.name) {
    res.status(400).json("Please provide a name");
  } else {
    next();
  }
}

function validateUserId(req, res, next) {
  User.getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json("Invalid user id");
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
}

module.exports = server;
