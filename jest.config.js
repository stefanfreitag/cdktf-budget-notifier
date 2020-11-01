module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/.gen", "/node_modules"],
  roots: ["<rootDir>/test"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
