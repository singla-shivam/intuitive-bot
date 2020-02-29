// this file imports all the methods from the directory
// and exports them
const {handleGuarantyIntent} = require('./guaranty')
const {handleWarrantyIntent} = require('./warranty')

module.exports = {handleGuarantyIntent, handleWarrantyIntent}