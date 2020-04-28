/**
 *
 * @param {WebhookClient} agent
 * @param {Product} product
 * @return {Promise<void>}
 */
async function handleBuildQualityIntent(agent, product) {
  agent.add(`Yes, this product has an excellent build quality. And it is from a well-known brand that you can trust.`)
}

module.exports = {handleBuildQualityIntent}
