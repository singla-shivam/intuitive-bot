// this file imports all the methods from the directory
// and exports them

const {Suggestion} = require('dialogflow-fulfillment')
const {checkTV, getAllTags, getOrdinal, setContextForCartConfirm} = require('../../utils')
const {findProductsByTags} = require("../../database/product")

const {handleGuarantyIntent} = require('./guaranty')
const {handleWarrantyIntent} = require('./warranty')
const {handleDiscountIntent} = require('./discount')
const {handleYoutubeIntent} = require('./youtube')
const {handleScreenSizeIntent} = require('./screen-size')
const {handleScreenResolutionIntent} = require('./screen-resolution')
const {handleBuildQualityIntent} = require('./build-quality')
const {handleConnectivityIntent} = require('./connectivity')
const {handleColorIntent} = require('./color')
const {handleScreenShareIntent} = require('./screen-share')

const {clarifyWhichProduct} = require("../genericMethods/clarifyProduct")

async function handleFaq(agent, subAction) {
  const product = await findProduct(agent)
  if(!product) return
  console.log('handleFAQ', product)
  console.log('handleFAQ - parameters', agent.parameters)
  switch (agent.parameters.subAction || subAction) {
    case 'discount': {
      await handleDiscountIntent(agent, product)
      break
    }
    case 'guaranty': {
      await handleGuarantyIntent(agent, product)
      break
    }
    case 'warranty': {
      await handleWarrantyIntent(agent, product)
      break
    }
    case 'youtube': {
      await handleYoutubeIntent(agent, product)
      break
    }
    case 'screen-size': {
      await handleScreenSizeIntent(agent, product)
      break
    }
    case 'screen-resolution': {
      await handleScreenResolutionIntent(agent, product)
      break
    }
    case 'screen-share': {
      await handleScreenShareIntent(agent, product)
      break
    }
    case 'build-quality': {
      await handleBuildQualityIntent(agent, product)
      break
    }
    case 'connectivity': {
      await handleConnectivityIntent(agent, product)
      break
    }
    case 'color': {
      await handleColorIntent(agent, product)
      break
    }
  }
  agent.parameters.action = 'faq'
  agent.parameters.subAction = agent.parameters.subAction || subAction
  agent.add(new Suggestion('Add to cart'))
  setContextForCartConfirm(agent, agent.parameters)
}

/**
 *
 * @param {WebhookClient} agent
 * @return {Promise<Product>}
 */
async function findProduct(agent) {
  console.log('faq invoked', JSON.stringify(agent.parameters))
  const ordinal = getOrdinal(agent)
  if(ordinal) agent.parameters.ordinal = ordinal
  const quantity = agent.parameters.quantity
  if(!quantity) delete agent.parameters.quantity
  let tags = getAllTags(agent.parameters.tags, agent.parameters.newTags)
  if(!checkTV(tags)) {
    agent.add("FAQ are supported only on TV")
    return void 0
  }

  let products = await findProductsByTags(tags)
  agent.parameters.tags = tags
  if(products.length === 0) {
    tags = agent.parameters.tags = agent.parameters.newTags
    delete agent.parameters.ordinal
    products = await findProductsByTags(tags)
  }

  const index = (!ordinal || ordinal > products.length)
    ? undefined
    : ordinal - 1
  if (index !== undefined || await clarifyWhichProduct(agent, products, agent.parameters)) {
    return products[index || 0]
  }
  return void 0
}

module.exports = {
  handleFaq,
  handleGuarantyIntent,
  handleWarrantyIntent,
  handleDiscountIntent,
  handleYoutubeIntent,
  handleScreenSizeIntent,
  handleScreenResolutionIntent,
  handleBuildQualityIntent,
  handleConnectivityIntent,
  handleColorIntent,
  handleScreenShareIntent
}