const {getRecentOrders, getOrdersByDate} = require('../../database/orders')
const {getProducts} = require('../../database/product')
const {getFormattedDate} = require('../../utils')
const {showListOfOrders, showCarousel} = require('../../utils/display')

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
  await _listOrders(agent, result)
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
  await _listOrders(agent, result, `No order ${date ? `on ${getFormattedDate(date, false)}` : 'in requested period'}`)
}

/**
 *
 * @param {WebhookClient} agent
 * @param {Order[]} orders
 * @param {string} defaultMessage
 */
async function _listOrders(agent, orders, defaultMessage = "No more orders") {
  console.log("_listOrders", orders)
  if (orders.length === 0) agent.add(defaultMessage)
  else {
    let products = await getProducts(Object.keys(orders[0].items))
    showListOfOrders(agent, orders[0], products)
    // showCarousel(agent, products, "Recent Orders2")
    // orders.forEach(order => {
    //   agent.add(`Order Id ${order.id} ordered on ${getFormattedDate(order.ordered)}`)
    //   Object.keys(order.items).forEach((item, i) => {
    //     agent.add(`${i + 1}. ${item}`)
    //   })
    // })
  }
}

module.exports = {listRecentOrders, findOrders}
