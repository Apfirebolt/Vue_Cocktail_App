/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom', // Add or modify this line
    moduleFileExtensions: ['js', 'ts', 'vue'],
    transform: {
      '^.+\\.vue$': '@vue/vue3-jest',
      '^.+\\.ts$': 'ts-jest',
      '^.+\\.js$': 'babel-jest',
    },
    // ... other Jest configurations ...
    extensionsToTreatAsEsm: ['.ts', '.vue'], //add this line.
  };