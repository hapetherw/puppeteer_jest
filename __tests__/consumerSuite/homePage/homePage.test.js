'use strict'

/* global process */

const utils = require('../../../resources/utils');
const testData = require('../../../resources/testData');
const homePageSelectors = require('./selectors.json');

describe('homePage', () => {
    beforeAll(async () => {
        await utils.goToUrl(testData.getLoginUrl())
    })
    
    beforeEach(async () => {
        await utils.goToUrl(testData.getHomeUrl())
    })

    afterAll(async () => {
        await utils.logout()
    })

    it('should redirect to grant budget page on grant budget action box click', async () => {
        await page.waitFor(homePageSelectors.homePageGrantBudgetActionBox)
        await page.click(homePageSelectors.homePageGrantBudgetActionBoxButton)

        await utils.waitForLoader()

        expect(page.url().endsWith('/budget-grant')).toBeTruthy()
    })

    it('should redirect to talents page on active talents action box click', async () => {
        await page.waitFor(homePageSelectors.homePageFreelancersActionBox)
        await page.click(homePageSelectors.homePageFreelancersActionBoxButton)

        await utils.waitForLoader()

        expect(page.url().endsWith('/talents')).toBeTruthy()
    })

    it('should redirect to jobs page on active jobs action box click', async () => {
        await page.waitFor(homePageSelectors.homePageActiveJobsActionBox)
        page.$eval(homePageSelectors.homePageActiveJobsActionBoxButton, el => el.scrollIntoView())
        await page.waitFor(2000)
        await page.click(homePageSelectors.homePageActiveJobsActionBoxButton)

        await utils.waitForLoader()

        expect(page.url().endsWith('/jobs')).toBeTruthy()
    })

    it('should redirect to budget approval page on budget request list item click', async () => {
        await page.waitFor(homePageSelectors.homePageManageBudgetNotificationListItem)
        await page.click(homePageSelectors.homePageManageBudgetNotificationListItemButton)

        await utils.waitForLoader()

        expect(page.url().endsWith('/budget-requests')).toBeTruthy()
    })

    xit('should redirect to notification on notification click', async () => {
        await page.waitFor(homePageSelectors.homePageNotificationBellButton)
        await page.click(homePageSelectors.homePageNotificationBellButton)
        
        await page.waitFor(2000)

        await page.click(homePageSelectors.homePageNotificationItem)

        await utils.waitForLoader()

        const url = page.url()

        expect(
            url.includes('/jobs') ||
            url.includes('/budget-requests') ||
            url.includes('/talents')
        ).toBeTruthy()
    })

})
