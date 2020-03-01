const {getRecentOrders, getOrdersByDate} = require('../../database/orders')
const {getFormattedDate} = require('../../utils')
const {showListOfOrders} = require('../../utils/display')

/**
 * List recent orders
 * @param {WebhookClient} agent
 * @return {Promise<void>}
 */
async function listRecentOrders(agent) {
  const result = await getRecentOrders(agent, agent.parameters.last)
  if (result.length === 0 && !agent.parameters.last) {
    agent.add("You have not ordered anything till now.")
    return
  }
  await _listOrders(agent, result, 'Here are you recent orders')
  if (result.length > 0) {
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
async function findOrders(agent) {
  console.log(agent.parameters)
  const {date, datePeriod} = agent.parameters
  /** @type Order[]*/
  let result

  if (date) result = await getOrdersByDate(agent, date)
  else if (datePeriod) result = await getOrdersByDate(agent, datePeriod.startDate, datePeriod.endDate)
  await _listOrders(agent, result, 'Here are you orders', `No order ${date ? `on ${getFormattedDate(date, false)}` : 'in requested period'}`)
}

/**
 *
 * @param {WebhookClient} agent
 * @param {Order[]} orders
 * @param {string} title
 * @param {string} [defaultMessage]
 */
async function _listOrders(agent, orders,title, defaultMessage = "I could not find more orders in your account.") {
  console.log("_listOrders", orders)
  if (orders.length === 0) agent.add(defaultMessage)
  else {
    showListOfOrders(agent, orders, title)
  }
}

module.exports = {listRecentOrders, findOrders}
