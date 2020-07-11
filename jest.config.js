
module.exports = {
      moduleFileExtensions: [
        "js",
        "json",
        "ts"
      ],
      testRegex: ".spec.ts$",
      transform: {
        "^.+\\.(t|j)s$": "ts-jest"
      },
      rootDir:".",
      coverageDirectory: "../coverage",
      testEnvironment: "node",
      moduleDirectories: [
        "node_modules",
        "src"
      ],
      roots: [
        "src"
      ],
      moduleNameMapper: {
        "src/(.*)": "<rootDir>/src/$1"
      }
  };