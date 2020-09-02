'use strict'

/* global process */

const utils = require('../../../resources/utils')
const testData = require('../../../resources/testData')
const selectors = require('./selectors.json')
const talentsUtils = require('./utils')

describe('TalentsAction', () => {
    beforeAll(async () => {
        await utils.goToUrl(testData.getTalentsUrl())
    })

    afterAll(async () => {
        await utils.logout()
    })

    it('Talents groupByProvider', async () => {
        await talentsUtils.expandRowTest(1)

        await talentsUtils.expandRowTest(3)

        await talentsUtils.expandButtonTest()

        await talentsUtils.expandButtonTest()

        await talentsUtils.filterTest()
    })

    it('Talents groupByDept', async () => {
        await page.waitFor(`${selectors.tabListContainer} > :nth-child(2)`)
        await page.click(`${selectors.tabListContainer} > :nth-child(2)`)
        await page.waitFor(1000)

        await talentsUtils.expandRowTest(1)

        await talentsUtils.expandRowTest(2)

        await talentsUtils.expandButtonTest()

        await talentsUtils.expandButtonTest()

        await talentsUtils.filterTest()

        await page.waitFor(selectors.downloadCSVButton)
        await page.click(selectors.downloadCSVButton)
        await page.waitFor(2000)
    })

})
