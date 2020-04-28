/**
 *
 * @param {WebhookClient} agent
 * @param {Product} product
 * @return {Promise<void>}
 */
async function handleDiscountIntent(agent, product) {
  agent.add(`The discount on ${product.name} is Rs.${product.mrp - product.price}(${_calculateDiscount(product.mrp, product.price)}%). The MRP in Rs.${product.mrp}`)
}

function _calculateDiscount(marketPrice, sellingPrice) {
  return Math.ceil((marketPrice - sellingPrice) * 100 / marketPrice)
}

module.exports = {handleDiscountIntent}
