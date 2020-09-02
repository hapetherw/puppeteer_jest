const testData = require('./testData')
const selectors = require('../__tests__/consumerSuite/login/selectors.json')
const loaderSelectors = require('./components/loader/selectors.json')
const jsonLogger = require('./jsonLogger')

const _login = async (userType, currPage = page) => {
    await currPage.waitFor(selectors.emailInput)
    await currPage.type(
        selectors.emailInput,
        testData.getUsername(userType),
    )
    await currPage.type(
        selectors.passInput,
        testData.getPassword(userType),
    )
    await currPage.click(selectors.signInButton)
    await currPage.waitForNavigation({ waitUntil: 'domcontentloaded' })
}

const uid = () => Math.random().toString(36).substring(2)

const logout = async (currPage = page) => {
    await currPage.waitFor(selectors.userMenu)
    await currPage.click(selectors.userMenu)
    await currPage.waitFor(selectors.userMenuItemLogout)
    await currPage.click(selectors.userMenuItemLogout)
    await currPage.waitFor(selectors.emailInput)
}

const goToUrl = async (
    url,
    currPage = page,
    userType = testData.userType.COMPANY_ADMIN,
) => {
    await currPage.goto(url, { waitUntil: 'networkidle0' })
    const currentUrl = await currPage.url()
    if (currentUrl.endsWith('/login')) {
        await _login(userType, currPage)
        await currPage.goto(url, { waitUntil: 'networkidle0' })
    }
}

const getQuarterFromTimestamp = (timestamp = Date.now()) => {
    const date = new Date(timestamp)
    const month = date.getMonth() + 1
    return Math.ceil(month / 3)
}

const getElementByText = async (selector, text, currPage = page) => {
    let wantedEl
    const el = await currPage.$$(selector)
    if (!el) {
        return
    }
    for (let i = 0; i < el.length; i++) {
        const currentText = await getText(el[i], currPage)
        if (currentText.includes(text)) {
            wantedEl = el[i]
            break
        }
    }
    return wantedEl
}

const clickByText = async (selector, text, page = currPage) =>
    (await getElementByText(selector, text, page)).click()

const uploadFile = async (selector, filePath, currPage = page) => {
    const futureFileChooser = currPage.waitForFileChooser()
    await currPage.click(selector)
    const fileChooser = await futureFileChooser
    await fileChooser.accept([filePath])
}

const getText = async (element, currPage = page) =>
    await currPage.evaluate((el) => el.textContent, element)

const getTextBySelector = async (selector, currPage = page) =>
    await currPage.$eval(selector, (el) => el.value)

const getTextByString = async (text, currPage = page) =>
    await currPage.$$eval(text, (el) => el[0].innerText)

const waitForLoader = async (currPage = page) => {
    try {
        await currPage.waitFor(loaderSelectors.loader, { timeout: 5000 })
        await currPage.waitFor(loaderSelectors.loader, { hidden: true })
    } catch (ex) {
        jsonLogger.warn({
            type: 'TRACKING',
            function: 'utils:waitForLoader',
            message: `error waiting for loader`,
        })
    }
}

const getRequestByEndpoint = (endpoint, currPage = page) =>
    currPage.waitForResponse((response) => response.url().endsWith(endpoint))

module.exports = {
    uid,
    logout,
    clickByText,
    getText,
    goToUrl,
    getTextByString,
    getElementByText,
    uploadFile,
    waitForLoader,
    getTextBySelector,
    getRequestByEndpoint,
    getQuarterFromTimestamp,
}
