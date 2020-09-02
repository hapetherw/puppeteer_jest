'use strict'

/* global process */
const utils = require('../../../resources/utils');
const testData = require('../../../resources/testData')
const selectors = require('./selectors.json');


const createDepartment = async (departmentName, costCenter) => {
    await utils.goToUrl(testData.getUserAndDepartmentsUrl())
    await page.waitFor(selectors.addManageDepartmentButton);
    await page.click(selectors.addManageDepartmentButton);
    await page.waitFor(selectors.addNewDepartmentButton);
    await page.click(selectors.addNewDepartmentButton);

    await page.waitFor(selectors.departmentNameInput);
    await page.type(selectors.departmentNameInput, departmentName);
    await page.type(selectors.costCenterInput, costCenter);
    await page.click(selectors.NewDepartmentPopupAddButton);
    await utils.waitForLoader()
}

module.exports = {
    createDepartment
}