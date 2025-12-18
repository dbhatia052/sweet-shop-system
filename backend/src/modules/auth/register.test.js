const request = require("supertest");
const app = require("../../bootstrap/app");

describe("POST /api/auth/register", () => {
  it("should register a user and return a token", async () => {
    const uniqueEmail = `test_${Date.now()}@example.com`;

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: uniqueEmail,
        password: "StrongPass123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });
});
