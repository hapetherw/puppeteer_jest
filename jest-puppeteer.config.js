'use strict'

const isHeadless = process.env.STAGE !== 'local'

module.exports = {
    launch: {
        devtools: false,
        dumpio: false,
        headless: isHeadless,
        defaultViewport: isHeadless ? {
            width: 1920,
            height: 1080,
        } : null,
    },
    browser: 'chromium',
    browserContext: 'default',
}
