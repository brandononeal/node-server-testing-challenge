exports.seed = function (knex) {
  return knex("users")
    .truncate()
    .then(function () {
      return knex("users").insert([{ name: "Mario" }, { name: "Luigi" }]);
    });
};
