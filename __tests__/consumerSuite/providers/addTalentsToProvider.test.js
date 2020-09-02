'use strict'

/* global process */

const utils = require('../../../resources/utils')
const companyProviderUtils = require('./utils')
const testData = require('../../../resources/testData')

describe('addTalentsToProvider', () => {
    afterAll(async () => {
        await utils.logout()
    })

    const providerName = utils.uid()
    const providerEmail = `${providerName}@stoketalent.com`
    const additionDocumentPath = 'files/nda.pdf'

    it('should add company provider on providers page', async () => {
        await utils.goToUrl(testData.getProvidersUrl())
        await utils.waitForLoader()
        await companyProviderUtils.addProviderFreelancer(providerEmail, providerName, undefined,  additionDocumentPath)
        const addCompanyRequest = await page.waitForResponse((response) =>
            response.url().endsWith('/companyProvider'),
        )

        // [TODO] change the validation to searching the provider on table when it be possible
        expect(await addCompanyRequest.ok()).toBeTruthy()
    })

    // [TODO] continue add talents with CSV when we could find the provider on the providers table with search
})
