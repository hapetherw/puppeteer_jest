module.exports = {
    preset: 'jest-puppeteer',
    testPathIgnorePatterns: ['utils.js'],
    setupFiles: ["dotenv/config"],
    setupFilesAfterEnv: ['./jest.setup.js'],
}
