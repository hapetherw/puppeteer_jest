'use strict'

/* global process */

const testData = require('../../../resources/testData')
const utils = require('../../../resources/utils')
const pageHeaderSelectors = require('../../../resources/components/pageHeader/selectors.json')
const jobsSelectors = require('./selectors.json')
const jsonLogger = require('../../../resources/jsonLogger')

const jobsFiltersClick = async (index, currPage = page) => {
    await currPage.waitFor(`${jobsSelectors.jobsFilter}${index})`)
    await currPage.click(`${jobsSelectors.jobsFilter}${index})`)
}

const isJobExist = async (title, currPage = page) => {
    const job = await utils.getElementByText(
        jobsSelectors.jobListItems,
        title,
        currPage,
    )
    expect(job).toBeDefined()
    return job
}

const clickOnJobCardMenu = async (jobTitle, index, currPage = page) => {
    await currPage.waitFor(jobsSelectors.jobListItems)
    const job = await isJobExist(jobTitle, currPage)
    await job.hover()
    await currPage.waitFor(2000)
    await currPage.waitFor(jobsSelectors.jobMenu)
    await currPage.click(jobsSelectors.jobMenu)

    await currPage.waitFor(2000)
    const realIndex = index * 2
    await currPage.waitFor(`${jobsSelectors.jobMenuAction}${realIndex})`)
    await currPage.click(`${jobsSelectors.jobMenuAction}${realIndex})`)

    await currPage.waitFor(jobsSelectors.jobMenuCconfirmation)
    await currPage.click(jobsSelectors.jobMenuCconfirmation)
    await currPage.waitFor(2000)
    await currPage.waitFor(jobsSelectors.jobListContainer)
}

const createJob = async (index, currPage = page) => {
    await currPage.waitFor(pageHeaderSelectors.pageHeaderActionButton)
    await currPage.click(pageHeaderSelectors.pageHeaderActionButton)
    await currPage.waitFor(`${jobsSelectors.newJobOptionOnActionMenu}${index}`)
    await currPage.click(`${jobsSelectors.newJobOptionOnActionMenu}${index}`)
    await utils.waitForLoader(currPage)
}
const createJobStart = async (
    title,
    jobDescription,
    currPage = page,
    userType = testData.userType.COMPANY_ADMIN,
    budget = 10,
    department = 'FirstDep',
) => {
    await createJob(2, currPage)
    await currPage.waitFor(jobsSelectors.jobTitleInput)
    await currPage.type(jobsSelectors.jobTitleInput, title)

    await currPage.waitFor(jobsSelectors.jobDescriptionInput)
    await currPage.type(jobsSelectors.jobDescriptionInput, jobDescription)

    await currPage.waitFor(jobsSelectors.jobNextButton)
    await currPage.click(jobsSelectors.jobNextButton)

    try {
        await currPage.waitFor(jobsSelectors.selectHMButton)
        await currPage.click(jobsSelectors.selectHMButton)
        await currPage.waitFor(2000)
        await currPage.type(jobsSelectors.selectHMButton, department)
        await currPage.waitFor(2000)

        await currPage.waitFor(jobsSelectors.selectHM)
        await currPage.click(jobsSelectors.selectHM)
    } catch {
        jsonLogger.info({
            type: 'TRACKING',
            function: 'newJobPost:beforeEach',
            message: `Missing Hirring manager`,
        })
    }

    await currPage.waitFor(jobsSelectors.jobBudgetInput)
    await currPage.type(jobsSelectors.jobBudgetInput, String(budget))

    await currPage.waitFor(jobsSelectors.jobNextButton)
    await currPage.click(jobsSelectors.jobNextButton)

    await currPage.waitFor(jobsSelectors.jobNextButton)
    await currPage.click(jobsSelectors.jobNextButton)

    await currPage.waitFor(jobsSelectors.jobChooseTalent)
    await currPage.click(jobsSelectors.jobChooseTalent)

    await currPage.waitFor(jobsSelectors.jobNextButton)
    await currPage.click(jobsSelectors.jobNextButton)

    await currPage.waitFor(2000)
    if (userType === testData.userType.COMPANY_ADMIN) {
        await currPage.waitFor(jobsSelectors.jobCreatedGotItButton)
        await currPage.click(jobsSelectors.jobCreatedGotItButton)
    } else {
        await currPage.waitFor(jobsSelectors.messageBudgetRequestAction)
        await currPage.click(jobsSelectors.messageBudgetRequestAction)
    }
    await currPage.waitFor(2000)
    await utils.goToUrl(testData.getJobsUrl(), currPage)
    await currPage.waitFor(jobsSelectors.jobListContainer)
    await jobsFiltersClick(userType === testData.userType.COMPANY_ADMIN ? 1 : 3, currPage )
    await isJobExist(title, currPage)
}

const createJobPost = async (
    title,
    jobDescription,
    currPage = page,
    userType = testData.userType.COMPANY_ADMIN,
    budget = 10,
    department = 'FirstDep',
) => {
    await createJob(1, currPage)
    await currPage.waitFor(jobsSelectors.jobTitleInput)
    await currPage.type(jobsSelectors.jobTitleInput, title)

    await currPage.waitFor(jobsSelectors.jobDescriptionInput)
    await currPage.type(jobsSelectors.jobDescriptionInput, jobDescription)

    await currPage.waitFor(jobsSelectors.jobTypeCheckbox)
    await currPage.click(jobsSelectors.jobTypeCheckbox)
    await currPage.waitFor(2000)

    await currPage.waitFor(jobsSelectors.jobNextButton)
    await currPage.click(jobsSelectors.jobNextButton)

    await currPage.waitFor(jobsSelectors.skillsSuggestions)
    await currPage.click(jobsSelectors.skillsSuggestions)

    await currPage.waitFor(jobsSelectors.jobNextButton)
    await currPage.click(jobsSelectors.jobNextButton)

    await currPage.waitFor(jobsSelectors.jobNextButton)
    await currPage.click(jobsSelectors.jobNextButton)

    try {
        await currPage.waitFor(jobsSelectors.selectHMButton, { timeout: 5000 })
        await currPage.click(jobsSelectors.selectHMButton)
        await currPage.waitFor(2000)
        await currPage.type(jobsSelectors.selectHMButton, department)
        await currPage.waitFor(2000)
        await currPage.waitFor(jobsSelectors.selectHM)
        await currPage.click(jobsSelectors.selectHM)
    } catch {
        jsonLogger.info({
            type: 'TRACKING',
            function: 'newJobPost:beforeEach',
            message: `Missing Hirring manager`,
        })
    }

    await currPage.waitFor(jobsSelectors.jobBudgetInput)
    await currPage.type(jobsSelectors.jobBudgetInput, String(budget))

    await currPage.waitFor(jobsSelectors.jobNextButton)
    await currPage.click(jobsSelectors.jobNextButton)

    await currPage.waitFor(jobsSelectors.jobNextButton)
    await currPage.click(jobsSelectors.jobNextButton)

    await currPage.waitFor(2000)
    await currPage.waitFor(jobsSelectors.jobCreatedGotItButton)
    await currPage.click(jobsSelectors.jobCreatedGotItButton)
    await currPage.waitFor(2000)
    await utils.goToUrl(testData.getJobsUrl(), currPage)
    await currPage.waitFor(jobsSelectors.jobListItems)
    await isJobExist(title, currPage)
}

const completeJob = async (jobTitle, currPage = page) => {
    await currPage.waitFor(jobsSelectors.jobListItems)
    await utils.clickByText(jobsSelectors.jobListItems, jobTitle, currPage)
    await currPage.waitFor(jobsSelectors.jobStatus)

    const status = await utils.getTextByString(
        jobsSelectors.jobStatus,
        currPage,
    )

    expect(status).toEqual('Active')

    //  cancel milestone
    await currPage.waitFor(jobsSelectors.milestoneCancelButton)
    await currPage.click(jobsSelectors.milestoneCancelButton)

    await currPage.waitFor(jobsSelectors.milestoneCancelCinfirmationButton)
    await currPage.click(jobsSelectors.milestoneCancelCinfirmationButton)

    await currPage.waitFor(2000)

    await currPage.waitFor(jobsSelectors.jobBackButton)
    await currPage.click(jobsSelectors.jobBackButton)

    await clickOnJobCardMenu(jobTitle, 2, currPage)
    const currentJob = await utils.getElementByText(
        jobsSelectors.jobListItems,
        jobTitle,
        currPage,
    )
    await expect(currentJob).toBeUndefined()
}

module.exports = {
    createJobPost,
    createJobStart,
    completeJob,
    clickOnJobCardMenu,
    jobsFiltersClick,
    isJobExist,
}
