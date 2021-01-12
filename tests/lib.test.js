const lib = require("./lib");

//Always group related tests inside a describe block
// describe("absolute", () => {
//   it("should return a positive number if input is postive", () => {
//     const result = lib.absolute(1);
//     expect(result).toBe(1);
//   });

//   it("should return a positive number if input is negative", () => {
//     const result = lib.absolute(1);
//     expect(result).toBe(1);
//   });

//   it("should return 0 if input is 0", () => {
//     const result = lib.absolute(0);
//     expect(result).toBe(0);
//   });
// });

describe('absolute', () => {

});

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Mosh');
    expect(result).toMatch(/Mosh/);
  });
});