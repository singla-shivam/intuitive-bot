const {findProductsByTags} = require('./../../database/product')

/**
 *
 * @param {WebhookClient} agent
 * @return {Promise<void>}
 */
async function handleGuarantyIntent(agent) {
  console.log("guaranty Invoked", JSON.stringify(agent.parameters))
  const {tags, ordinal} = agent.parameters
  const products = await findProductsByTags(tags)

  const index = (!ordinal || ordinal > products.length)
    ? undefined
    : ordinal - 1

  // if the ordinal was passed or only one product was fetched using the passed tags
  if (index !== undefined || products.length === 1) {
    let product = products[index || 0]
    agent.add(`The guarantee of ${product.name} is one year.`)
  } else {
    // if there is no product
    if (products.length === 0) agent.add('Which product you are talking about?')
    else {
      // if there are more than one products
      // TODO handle this
    }
  }
}

module.exports = {handleGuarantyIntent}
