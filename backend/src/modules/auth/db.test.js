const { testConnection } = require("../../shared/db");

describe("Database connection", () => {
  it("should connect to PostgreSQL successfully", async () => {
    await expect(testConnection()).resolves.not.toThrow();
  });
});
