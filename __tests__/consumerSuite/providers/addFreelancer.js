'use strict'

/* global process */

const utils = require('../../../resources/utils')
const testData = require('../../../resources/testData')
const companyProviderUtils = require('./utils')

describe('activateNewTalentJob', () => {

    beforeEach(async () => {
    })

    afterAll(async () => {
        await utils.logout()
    })

    const talentFirstName = utils.uid()
    const talentLastName = utils.uid()
    const talentEmail = `${talentFirstName + talentLastName}@stoketalent.com`
    const additionDocumentPath = 'files/nda.pdf'

    it('should add freelancer provider on providers page', async () => {
        await utils.goToUrl(testData.getProvidersUrl())
        await utils.waitForLoader()
        await companyProviderUtils.addProviderFreelancer(talentEmail, talentFirstName, talentLastName, additionDocumentPath)
        const request = await utils.getRequestByEndpoint('/companyProvider')
        // [TODO] change the validation to searching the provider on table when it be possible
        expect(request.ok()).toBeTruthy()
    })

})
