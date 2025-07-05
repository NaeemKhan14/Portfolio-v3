const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // This maps "@/config/site" -> "<rootDir>/config/site.ts"
  },
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Uncomment if needed
}

module.exports = createJestConfig(config)