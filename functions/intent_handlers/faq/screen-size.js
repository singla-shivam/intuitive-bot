/**
 *
 * @param {WebhookClient} agent
 * @param {Product} product
 * @return {Promise<void>}
 */
async function handleScreenSizeIntent(agent, product) {
  agent.add(`The screen size of ${product.name} is ${product.display_size} inch.`)
}

module.exports = {handleScreenSizeIntent}
