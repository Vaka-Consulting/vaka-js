module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
};
