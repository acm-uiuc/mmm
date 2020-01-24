module.exports = {
  setupFilesAfterEnv: ['<rootDir>/start-offline.js'],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  }
}