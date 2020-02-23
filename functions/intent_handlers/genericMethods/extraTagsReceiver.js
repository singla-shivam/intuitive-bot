const {findProduct} = require("../productDiscovery/findProduct")
const {cartChangeQty} = require("../cart/changeQty")

/**
 * This method is invoked when additional tags are requested
 */
exports.extraTagsReceiver = async function (agent) {
  agent.parameters.tags = [...agent.parameters.tags, ...(agent.parameters.newTags || [])]
  // Merges old tags with new tags
  console.log("extraTagsReceiver.js Invoked", agent.parameters);
  if (agent.parameters.action === "cart") {
    await cartChangeQty(agent)
  } else if (agent.parameters.action === "discovery") {
    await findProduct(agent)
  }
}