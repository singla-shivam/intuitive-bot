const {findProduct} = require("../productDiscovery/findProduct")
const {cartChangeQty} = require("../cart/changeQty")
const {handleFaq} = require("../faq")
const {findProductsByTags} = require("../../database/product")

/**
 * This method is invoked when additional tags are requested
 */
exports.extraTagsReceiver = async function (agent) {
  console.log('extraTagsReceiver', agent.parameters)
  agent.parameters.tags = [...agent.parameters.tags, ...(agent.parameters.newTags || [])]
  const products = await findProductsByTags(agent.parameters.tags)
  if(products.length === 0) {
    agent.parameters.tags = agent.parameters.newTags
    delete agent.parameters.ordinal
  }
  console.log(agent.parameters)
  // Merges old tags with new tags
  console.log("extraTagsReceiver.js Invoked", agent.parameters);
  switch (agent.parameters.action) {
    case 'cart': {
      await cartChangeQty(agent)
      break
    }
    case 'discovery': {
      await findProduct(agent)
      break
    }
    case 'faq': {
      await handleFaq(agent)
      break
    }
  }
}