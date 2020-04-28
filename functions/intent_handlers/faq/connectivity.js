/**
 *
 * @param {WebhookClient} agent
 * @return {Promise<void>}
 * @param {Product} product
 */
async function handleConnectivityIntent(agent, product) {
  agent.add(`Yes, ${product.name} has HDMI and USB ports. It supports cable TV connection.`)
  if(product.smart_tv) agent.add('You can also connect it to Wi-Fi.')
  else agent.add('However, this TV can not be connected to the Internet.')
}

module.exports = {handleConnectivityIntent}
