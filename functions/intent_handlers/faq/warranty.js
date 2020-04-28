/**
 *
 * @param {WebhookClient} agent
 * @param {Product} product
 * @return {Promise<void>}
 */
async function handleWarrantyIntent(agent, product) {
  agent.add(`The product comes with warranty of one year.`)
}

module.exports = {handleWarrantyIntent}
