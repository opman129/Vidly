const { DESCRIBE } = require("sequelize/types/lib/query-types");
const lib = require("./lib");

//Always group related tests inside a describe block
describe("absolute", () => {
  test("should return a positive number if input is postive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  test("should return a positive number if input is negative", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  test("should return 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});
