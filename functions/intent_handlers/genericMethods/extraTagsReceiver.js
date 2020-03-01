const {findProduct} = require("../productDiscovery/findProduct")
const {cartChangeQty} = require("../cart/changeQty")
const {handleFaq} = require("../faq")

/**
 * This method is invoked when additional tags are requested
 */
exports.extraTagsReceiver = async function (agent) {
  agent.parameters.tags = [...agent.parameters.tags, ...(agent.parameters.newTags || [])]
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