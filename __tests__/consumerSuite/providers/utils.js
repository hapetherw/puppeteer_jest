'use strict'

/* global process */

const pageHeaderSelectors = require('../../../resources/components/pageHeader/selectors.json')
const companyProviderSelectors = require('./selectors.json')

const addProviderFreelancer = async (
    email,
    name,
    lastName,
    additionDocumentPath,
) => {
    await page.click(pageHeaderSelectors.pageHeaderActionButton)

    await page.waitFor(
        `${companyProviderSelectors.providerActionOption}${lastName ? 2 : 4})`,
    )
    await page.click(
        `${companyProviderSelectors.providerActionOption}${lastName ? 2 : 4})`,
    )

    await page.waitFor(companyProviderSelectors.providerActionPopup)
    if (lastName) {
        await page.type(
            companyProviderSelectors.additionPopupFirstNameInput,
            String(name),
        )
        await page.type(
            companyProviderSelectors.additionPopupLastNameInput,
            String(lastName),
        )
    } else {
        await page.type(
            companyProviderSelectors.additionPopupNameInput,
            String(name),
        )
    }
    await page.type(
        companyProviderSelectors.additionPopupEmailInput,
        String(email),
    )

    // [NOTE] - temporary commenting this, since @anat might want to put the additional files upload back to the popup
    // await utils.uploadFile(selectors.additionPopupDragAndDrop, additionDocumentPath)
    await page.click(companyProviderSelectors.additionPopupSubmitButton)
}

module.exports = {
    addProviderFreelancer,
}
