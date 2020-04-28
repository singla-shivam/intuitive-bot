/**
 *
 * @param {WebhookClient} agent
 * @param {Product} product
 * @return {Promise<void>}
 */
async function handleScreenShareIntent(agent, product) {
  agent.add(`Yes, you can easily share you phone, laptop, etc. screen to ${product.name}`)
}

module.exports = {handleScreenShareIntent}
