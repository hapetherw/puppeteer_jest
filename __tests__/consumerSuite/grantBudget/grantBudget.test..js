'use strict'

/* global process */

const utils = require('../../../resources/utils')
const testData = require('../../../resources/testData')
const grantSelectors = require('./selectors.json')
const tableSelectors = require('../../../resources/components/table/selectors.json')
const tableUtils = require('../../../resources/components/table/utils')
const selectSelectors = require('../../../resources/components/select/selectors.json')

describe('grant budget', () => {
    beforeAll(async () => {
        await utils.goToUrl(testData.getLoginUrl())
    })

    beforeEach(async () => {
        await utils.goToUrl(testData.getBudgetUrl())
    })

    afterAll(async () => {
        await utils.logout()
    })

    it('Grant budget page and action', async () => {
        await page.waitFor(grantSelectors.budgetAction)
        await page.click(grantSelectors.budgetAction)

        await page.waitFor(grantSelectors.grantBudgetButton)
        await page.click(grantSelectors.grantBudgetButton)

        await utils.waitForLoader()

        expect(page.url().endsWith('/budget-grant')).toBeTruthy()

        await page.waitFor(grantSelectors.grantBudgetDepartmentFilterButton)
        await page.click(grantSelectors.grantBudgetDepartmentFilterButton)

        await page.waitFor(grantSelectors.grantBudgetDepartmentFilterDropDown)
        await page.click(grantSelectors.grantBudgetDepartmentFilterDropDown)
        
        const currentQuater = utils.getQuarterFromTimestamp();
        const currentBudget = await tableUtils.getColumnValue(0, currentQuater + 3)

        const currentAvailableBudget = Number(currentBudget.substring(1, currentBudget.indexOf('/') - 1))
        await page.waitFor(grantSelectors.grantBudgetRowAction)
        await page.click(grantSelectors.grantBudgetRowAction)
        
        await page.waitFor(selectSelectors.selectInput)
        await page.click(selectSelectors.selectInput)
        
        await page.waitFor(selectSelectors.dropDownOption)
        await page.click(selectSelectors.dropDownOption)

        await page.waitFor(2000)

        await page.waitFor(grantSelectors.grantBudgetAnount)
        await page.type(grantSelectors.grantBudgetAnount, '1')
        await page.waitFor(grantSelectors.grantBudgetSubmit)
        await page.click(grantSelectors.grantBudgetSubmit)

        await utils.waitForLoader()
        const currentBudgetAfterGrant = await tableUtils.getColumnValue(0, currentQuater + 3)
        const currentAvailableBudgetAfterGrant = Number(currentBudgetAfterGrant.substring(1, currentBudgetAfterGrant.indexOf('/') - 1))
        expect(currentAvailableBudgetAfterGrant).toBe(currentAvailableBudget + 1)
    })
})
