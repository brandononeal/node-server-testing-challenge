const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

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

describe("endpoints", () => {
  describe("[POST] /users", () => {
    it("returns newly created user", async () => {
      const res = await request(server).post("/users").send(Mario);
      expect(res.body.name).toBe("Mario");
    });
    it("returns status code 400 if no name", async () => {
      const res = await request(server).post("/users").send();
      expect(res.status).toBe(400);
    });
  });
  describe("[DELETE] /users/:id", () => {
    it("returns status code 200 after deleting user", async () => {
      await request(server).post("/users").send(Luigi);
      const res = await request(server).delete("/users/1");
      expect(res.status).toBe(200);
    });
    it("returns status code 404 if invalid id", async () => {
      const res = await request(server).delete("/users/37");
      expect(res.status).toBe(404);
    });
  });
});
