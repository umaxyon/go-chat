const nextJest = require("next/jest")

const createJestConfig = nextJest({
    dir: "./"
})

const customJestConfig = {
    // jest.setup.jsを作成する場合のみ定義。
    // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
      "^@/components/(.*)$": "<rootDir>/src/components/$1",
      "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
    },
    testEnvironment: "jest-environment-jsdom",
  };

module.exports = createJestConfig(customJestConfig)
