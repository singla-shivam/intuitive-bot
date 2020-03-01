const {findProductsByTags} = require('./../../database/product')
const {getAllTags, checkTV, showFAQMessage, clarifyProductForFAQ, setContextForCartConfirm} = require('../../utils')

/**
 *
 * @param {WebhookClient} agent
 * @return {Promise<void>}
 */
async function handleDiscountIntent(agent) {
  console.log("discount Invoked", JSON.stringify(agent.parameters))
  const ordinal = agent.parameters.ordinal
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
    showFAQMessage(agent, `The discount on ${product.name} is Rs.${product.mrp - product.price}(${_calculateDiscount(product.mrp, product.price)}%). The MRP in Rs.${product.mrp}`)
    setContextForCartConfirm(agent, tags, quantity, ordinal)
  } else {
    clarifyProductForFAQ(agent, tags, quantity, 'faq', 'guaranty')
  }
}

function _calculateDiscount(marketPrice, sellingPrice ) {
  return Math.ceil((marketPrice - sellingPrice) * 100 / marketPrice)
}

module.exports = {handleDiscountIntent}
