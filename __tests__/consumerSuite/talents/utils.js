'use strict'

const selectors = require('./selectors.json');

const expandRowTest = async (row) => {
    await page.waitFor(selectors.tableRow)
    await page.waitFor(`:nth-child(${row}) ${selectors.arrowExpandButton}`)
    await page.click(selectors.arrowExpandButton)
    await page.waitFor(1000)
}

const expandButtonTest = async () =>{
    await page.waitFor(selectors.expandButton)
    await page.click(selectors.expandButton)
    await page.waitFor(1000)
}

const filterTest = async () => {
    await page.waitFor(selectors.talentsDepartmentFilterButton)
    await page.click(selectors.talentsDepartmentFilterButton)

    await page.waitFor(`${selectors.talentsDepartmentFilterDropDown}:nth-child(2) .dropdown-item-content`)
    await page.click(`${selectors.talentsDepartmentFilterDropDown}:nth-child(2) .dropdown-item-content`)
    await page.waitFor(1000)

    await page.waitFor(selectors.talentsDepartmentFilterButton)
    await page.click(selectors.talentsDepartmentFilterButton)

    await page.waitFor(`${selectors.talentsDepartmentFilterDropDown}:nth-child(5) .dropdown-item-content`)
    await page.click(`${selectors.talentsDepartmentFilterDropDown}:nth-child(5) .dropdown-item-content`)
    await page.waitFor(1000)

    await page.waitFor(selectors.talentsDepartmentFilterButton)
    await page.click(selectors.talentsDepartmentFilterButton)

    await page.waitFor(`${selectors.talentsDepartmentFilterDropDown}:nth-child(1) .dropdown-item-content`)
    await page.click(`${selectors.talentsDepartmentFilterDropDown}:nth-child(1) .dropdown-item-content`)
    await page.waitFor(1000)
}

module.exports = {
    expandRowTest,
    expandButtonTest,
    filterTest
}
