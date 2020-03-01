// this file imports all the methods from the directory
// and exports them
const {handleGuarantyIntent} = require('./guaranty')
const {handleWarrantyIntent} = require('./warranty')
const {handleDiscountIntent} = require('./discount')
const {handleYoutubeIntent} = require('./youtube')

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
    case 'youtube': {
      await handleYoutubeIntent(agent)
      break
    }
  }
}

module.exports = {handleFaq, handleGuarantyIntent, handleWarrantyIntent, handleDiscountIntent, handleYoutubeIntent}