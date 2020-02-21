const {getRecentOrders} = require('../../database/orders')
const {getFormattedDate} = require('../../utils')

/**
 * List recent orders
 * @param {WebhookClient} agent
 * @return {Promise<void>}
 */
async function listRecentOrders(agent) {
  console.log(agent.parameters)
  const result = await getRecentOrders(agent, agent.parameters.last)
  console.log(result)
  _listOrders(agent, result)
  if(result.length > 0) {
    agent.context.set("orders-recent-showmore", 5, {
      last: result[result.length - 1].ordered
    })
  }
}

/**
 *
 * @param {WebhookClient} agent
 * @return {Promise<void>}
 */
async function listNextRecentOrders(agent) {

}

/**
 *
 * @param {WebhookClient} agent
 * @param {Order[]} orders
 */
function _listOrders(agent, orders) {
  if(orders.length === 0) agent.add("No more orders")
  else {
    orders.forEach(order => {
      agent.add(`Order Id ${order.id} ordered on ${getFormattedDate(order.ordered)}`)
      Object.keys(order.items).forEach((item, i) => {
        agent.add(`${i + 1}. ${item}`)
      })
    })
  }
}

module.exports = {listRecentOrders, listNextRecentOrders}
