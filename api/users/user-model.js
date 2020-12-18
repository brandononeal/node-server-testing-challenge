const db = require("../../data/dbConfig");

async function insert(user) {
  const [id] = await db("users").insert(user);
  return db("users").where({ id }).first();
}

function remove(id) {
  return db("users").where("id", id).del();
}

function getById(id) {
  return db("users").where("id", id).first();
}

function getAll() {
  return db("users");
}

module.exports = {
  insert,
  remove,
  getById,
  getAll,
};
