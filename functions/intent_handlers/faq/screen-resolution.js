/**
 *
 * @param {WebhookClient} agent
 * @param {Product} product
 * @return {Promise<void>}
 */
async function handleScreenResolutionIntent(agent, product) {
  agent.add(`The screen resolution of ${product.name} is ${product.resolution}`)
}

module.exports = {handleScreenResolutionIntent}
