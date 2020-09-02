'use strict'

/* global process */

const utils = require('../../../resources/utils')
const departmentUtils = require('./utils')
const selectors = require('./selectors.json')

describe('newDepartment', () => {
    beforeEach(async () => {})

    afterAll(async () => {
        await utils.logout()
    })

    it('should create a new department', async () => {
        const departmentName = `Department ${utils.uid()}`
        const costCenter = 'Puppeteer Cost Center 1'

        await departmentUtils.createDepartment(departmentName, costCenter)

        await page.waitFor(selectors.departmentsUl)

        const content = await page.content()

        expect(content.includes(departmentName)).toBeTruthy()
    })
})
