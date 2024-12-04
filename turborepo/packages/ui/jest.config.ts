export default {
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': 'ts-jest',  // TypeScript 파일을 ts-jest로 변환
  },
  testMatch: [
    '**/src/__tests__/**/*.ts', // This will match all test files under src/__tests__ and its subdirectories
  ],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js','ts'], // must include 'js'
};
