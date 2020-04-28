/**
 *
 * @param {WebhookClient} agent
 * @param {Product} product
 * @return {Promise<void>}
 */
async function handleGuarantyIntent(agent, product) {
  agent.add(`The product comes with warranty of one year.`)
}

module.exports = {handleGuarantyIntent}
