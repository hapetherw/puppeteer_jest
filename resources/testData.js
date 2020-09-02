;`use strict`

const fs = require('fs')
const jsonLogger = require('./jsonLogger')
// master test
const env = {
    STAGE: 'dev',
    SCREENSHOTS_PATH: `${
        process.env.SCREENSHOTS_PATH || 'screenshots'
    }/${Date.now()}/`,
}

const domain = `https://dev.stoke.ws`

jsonLogger.info({
    type: 'TRACKING',
    function: 'env:data',
    environment: env,
    domain,
})

const getSsmParam = async (param) => {
    const ssmResponse = await ssm
        .getParameters({
            Names: [param],
            WithDecryption: true,
        })
        .promise()
    return ssmResponse
}

module.exports.userType = {
    COMPANY_ADMIN: { username: 'username', pass: 'password' },
    DEPARTMENT_ADMIN: { username: 'adminDepartment', pass: 'adminPassword' },
    USER: { username: 'userDepartment', pass: 'userPassword' },
}

module.exports.getUsername = (type) => {
    if (type === this.userType.COMPANY_ADMIN) {
        return 'integration-test@stoketalent.com'
    } else if (type === this.userType.DEPARTMENT_ADMIN) {
        return 'integration-test-admin-department@stoketalent.com'
    } else if (type === this.userType.USER) {
        return 'integration-test-user@stoketalent.com'
    }
}

module.exports.getPassword = () => {
    return 'integrationTest1!'
}

module.exports.getLoginUrl = () => `${domain}/login`

module.exports.getSignupUrl = (mail) =>
    `${domain}/signup?email=${mail}&invitationId=edd6625acbcce36f9388ddb7b39df0c7a4e7caa0d81fb47a22564e34987c50796e6b54f46fa94e8f8fcc1029465ad9af&entityName=R&D&firstName=John&lastName=Lamar`

module.exports.getForgorPasswordUrl = () => `${domain}/forgot-password`

module.exports.getSetupUrl = () => `${domain}/settings/setup`

module.exports.getHomeUrl = () => `${domain}`

module.exports.getBudgetUrl = () => `${domain}/budget`

module.exports.getTalentsUrl = () => `${domain}/talents`

module.exports.getJobsUrl = () => `${domain}/jobs`

module.exports.getLoginUrl = () => `${domain}/login`

module.exports.getProvidersUrl = () => `${domain}/settings/providers`

module.exports.getUserAndDepartmentsUrl = () =>
    `${domain}/settings/user-and-departments`

module.exports.getScreenshotsPath = () => {
    fs.mkdirSync(env.SCREENSHOTS_PATH, { recursive: true })
    return env.SCREENSHOTS_PATH
}
