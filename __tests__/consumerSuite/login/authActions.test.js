'use strict'

/* global process */

const utils = require('../../../resources/utils')
const testData = require('../../../resources/testData')
const selectors = require('./selectors.json')

describe('authActions', () => {
    const mail = 'example@stoketalent.com'
    let page
    let context
    beforeAll(async () => {
        context = await browser.createIncognitoBrowserContext()
        page = await context.newPage()
    })

    afterAll(async () => {
        await context.close()
    })

    it('should redirect to forgot password page from the login', async () => {
        await page.goto(testData.getLoginUrl(), { waitUntil: 'networkidle0' })
        await page.waitFor(selectors.forgotPasswordAnchor)
        await page.click(selectors.forgotPasswordAnchor)

        const currentUrl = await page.url()
        const expectedUrl = testData.getForgorPasswordUrl()
        expect(currentUrl === expectedUrl).toBeTruthy()
    })

    it('should redirect to login page from the signup', async () => {
        await page.goto(testData.getSignupUrl(mail), {
            waitUntil: 'networkidle0',
        })
        await page.waitFor(selectors.alreadyStokedAnchor)

        await page.click(selectors.alreadyStokedAnchor)

        const currentUrl = await page.url()
        const expectedUrl = testData.getLoginUrl()
        expect(currentUrl === expectedUrl).toBeTruthy()
    })

    it('The mail in the url should be same like in the locked input', async () => {
        await page.goto(testData.getSignupUrl(mail), {
            waitUntil: 'networkidle0',
        })
        await page.waitFor(selectors.emailInput)

        const lockedEmail = await utils.getTextBySelector(selectors.emailInput, page)
        expect(lockedEmail === mail).toBeTruthy()
    })
})
