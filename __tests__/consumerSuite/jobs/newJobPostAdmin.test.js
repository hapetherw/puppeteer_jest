'use strict'

/* global process */

const testData = require('../../../resources/testData')
const utils = require('../../../resources/utils')
const jsonLogger = require('../../../resources/jsonLogger')
const jobsSelectors = require('./selectors.json')
const jobsUtils = require('./utils.js')
const candidatesSelectors = require('../candidates/selectors.json')

describe('newJobPost company admin', () => {
    let jobTitle
    let jobDescription
    let page
    let context

    beforeAll(async () => {
        context = await browser.createIncognitoBrowserContext()
        page = await context.newPage()
        jobDescription = 'java'
    })

    beforeEach(async () => {
        jobTitle = `Puppeteer Test ${utils.uid()}`
        jsonLogger.info({ type: "TRACKING", function: "newJobPost:beforeEach", message: `Create job: ${jobTitle}` });
        await utils.goToUrl(testData.getJobsUrl(), page)
    })

    afterAll(async () => {
        await utils.logout(page)
    })

    it('should create a new job post', async () => {
        await jobsUtils.createJobPost(jobTitle, jobDescription, page)
        await jobsUtils.clickOnJobCardMenu(jobTitle, 1, page)
        const currentJob = await utils.getElementByText(
            jobsSelectors.jobListItems,
            jobTitle,
            page
        )
        await expect(currentJob).toBeUndefined()
    })

    it('should create a new job start', async () => {
        await jobsUtils.createJobStart(jobTitle, jobDescription, page)
        await jobsUtils.completeJob(jobTitle, page)
    })

    it('should create a job and activate it by hiring a talent', async () => {
        await jobsUtils.createJobPost(jobTitle, jobDescription, page)
        await utils.clickByText(jobsSelectors.jobListItems, jobTitle, page)
        await page.waitFor(candidatesSelectors.firstTalent)
        await page.hover(candidatesSelectors.firstTalent)
        await page.waitFor(2000)
        await page.waitFor(candidatesSelectors.firstTalentHire)
        await page.click(candidatesSelectors.firstTalentHire)
        await page.waitFor(jobsSelectors.contractAction)
        await page.click(jobsSelectors.contractAction)
        await page.waitFor(jobsSelectors.contractDoneAction)
        await page.click(jobsSelectors.contractDoneAction)
        await jobsUtils.completeJob(jobTitle, page)
    })
})
