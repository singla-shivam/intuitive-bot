// this file imports all the methods from the directory
// and exports them
const {handleGuarantyIntent} = require('./guaranty')
const {handleWarrantyIntent} = require('./warranty')
const {handleDiscountIntent} = require('./discount')

async function handleFaq(agent) {
  switch (agent.parameters.subAction) {
    case 'discount': {
      await handleDiscountIntent(agent)
      break
    }
    case 'guaranty': {
      await handleGuarantyIntent(agent)
      break
    }
    case 'warranty': {
      await handleWarrantyIntent(agent)
      break
    }
  }
}

module.exports = {handleFaq, handleGuarantyIntent, handleWarrantyIntent, handleDiscountIntent}