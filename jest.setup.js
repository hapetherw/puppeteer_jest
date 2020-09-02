const testData = require('./resources/testData')
const jsonLogger = require('./resources/jsonLogger')
jest.setTimeout(120000)

global.it = async (name, func) =>
    await test(name, async () => {
        try {
            jsonLogger.info({ type: "TRACKING", function: "jest:setup", message: `Start test: ${name}` });
            await func()
            jsonLogger.info({ type: "TRACKING", function: "jest:setup", message: `End test: ${name}` });
        } catch (e) {
            jsonLogger.error({ type: "TRACKING", function: "jest:setup", exception: `Test failed: ${name}` });
            const pages = await browser.pages();
            for (const page of pages) {
                await page.screenshot({
                    path: `${testData.getScreenshotsPath()}/${name}.png`,
                })
            }
            throw e
        }
    })
