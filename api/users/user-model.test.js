const User = require("./user-model");
const db = require("../../data/dbConfig");

const Mario = { name: "Mario" };
const Luigi = { name: "Luigi" };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("User model", () => {
  it("User.getAll returns empty array if no users", async () => {
    const result = await User.getAll();
    expect(result).toHaveLength(0);
  });
  it("User.getAll returns users", async () => {
    await db("users").insert(Mario);
    await db("users").insert(Luigi);
    const result = await User.getAll();
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty("name", "Mario");
    expect(result[1]).toHaveProperty("name", "Luigi");
  });
});
