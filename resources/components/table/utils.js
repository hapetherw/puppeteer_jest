'use strict'

/* global process */


const utils = require('../../utils')
const tableSelectors = require('./selectors.json')

const getColumnValue = async (row, col) => {
    await page.waitFor(`${tableSelectors.outerTableRows}${row}`)
    return utils.getTextByString(`${tableSelectors.outerTableRows}${row} div:nth-child(${col})`)
} 


module.exports = {
    getColumnValue
}