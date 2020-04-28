/**
 *
 * @param {WebhookClient} agent
 * @param {Product} product
 * @return {Promise<void>}
 */
async function handleColorIntent(agent, product) {
  agent.add(`The color of ${product.name} is black.`)
}

module.exports = {handleColorIntent}
