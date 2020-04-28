const {findProductsByTags} = require('./../../database/product')
const {checkTV, clarifyProductForFAQ, setContextForCartConfirm, getAllTags, getOrdinal} = require('../../utils')
const {Suggestion} = require('dialogflow-fulfillment')
/**
 *
 * @param {WebhookClient} agent
 * @return {Promise<void>}
 */
async function handleWarrantyIntent(agent) {
  console.log("warranty Invoked", JSON.stringify(agent.parameters))
  const ordinal = getOrdinal(agent)
  let tags = getAllTags(agent.parameters.tags, agent.parameters.newTags)
  if(!checkTV(tags)) {
    agent.add("FAQ are supported only on TV")
    return
  }
  let products = await findProductsByTags(tags)
  if(products.length === 0) {
    tags = agent.parameters.tags = agent.parameters.newTags
    delete agent.parameters.ordinal
    products = await findProductsByTags(tags)
  }
  let quantity = agent.parameters.quantity
  quantity = quantity === '' ? undefined : quantity

  const index = (!ordinal || ordinal > products.length)
    ? undefined
    : ordinal - 1

  // if the ordinal was passed or only one product was fetched using the passed tags
  if (index !== undefined || await clarifyProductForFAQ(agent, tags, quantity, 'faq', 'discount' , products)) {
    agent.add(`The product comes with warranty of one year.`)
    agent.add(new Suggestion('Add to cart'))
    setContextForCartConfirm(agent, tags, quantity, ordinal, 'faq', 'guaranty')
  }
}

module.exports = {handleWarrantyIntent}
