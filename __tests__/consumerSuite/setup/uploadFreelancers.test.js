'use strict'

/* global process */

const utils = require('../../../resources/utils')
const testData = require('../../../resources/testData')
const selectors = require('./selectors.json')

describe('uploadFreelancers', () => {
    beforeAll(async () => {
        await utils.goToUrl(testData.getSetupUrl())
    })

    afterAll(async () => {
        await utils.logout()
    })

    it('should upload freelancers and show them on freelancers management and on talent profile', async () => {
        const filePath = 'files/freelancers.csv'
        await page.waitFor(selectors.setupSkipButton)
        await page.click(selectors.setupSkipButton)
        await page.waitFor(2000) // animation time

        await utils.uploadFile(selectors.freelancersSetupDragAndDrop, filePath)

        await page.click(selectors.formSectionSubmitButton)
        await page.waitFor(2000) // animation time
        await page.click(selectors.formSectionSubmitButton)
    })
})
