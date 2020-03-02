const {findProductsByTags} = require('./../../database/product')
const {getAllTags, checkTV, showFAQMessage, clarifyProductForFAQ, setContextForCartConfirm, getOrdinal} = require('../../utils')
const {Suggestion} = require('dialogflow-fulfillment')

/**
 *
 * @param {WebhookClient} agent
 * @return {Promise<void>}
 */
async function handleConnectivityIntent(agent) {
  console.log("connectivity Invoked", JSON.stringify(agent.parameters))
  const ordinal = getOrdinal(agent)
  let quantity = agent.parameters.quantity
  quantity = quantity === '' ? undefined : quantity
  const tags = getAllTags(agent.parameters.tags, agent.parameters.newTags)
  if(!checkTV(tags)) {
    agent.add("FAQ are supported only on TV")
    return
  }
  const products = await findProductsByTags(tags)

  const index = (!ordinal || ordinal > products.length)
    ? undefined
    : ordinal - 1

  // if the ordinal was passed or only one product was fetched using the passed tags
  if (index !== undefined || products.length === 1) {
    let product = products[index || 0]
    showFAQMessage(agent, `Yes, ${product.name} has HDMI and USB ports. It supports cable TV connection.`)
    if(product.smart_tv) agent.add('You can also connect it to Wi-Fi.')
    else agent.add('However, this TV can not be connected to the Internet.')
    agent.add(new Suggestion('Add to cart'))
    setContextForCartConfirm(agent, tags, quantity, ordinal, 'faq', 'connectivity')
  } else {
    clarifyProductForFAQ(agent, tags, quantity, 'faq', 'connectivity')
  }
}

module.exports = {handleConnectivityIntent}
