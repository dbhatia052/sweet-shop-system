const request = require("supertest");
const app = require("../../bootstrap/app");

describe("Auth module – initial test", () => {
  it("should expose a health endpoint", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
  });
});
