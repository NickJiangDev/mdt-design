module.exports = {
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    '!**/__stories__/*.tsx',
    '!**/*.stories.*',
    '!**/__stories-template__/*.tsx',
    '!src/components/icons/*/*',
  ],
  transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss)$', 'node_modules/(?!react-data-grid)'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
