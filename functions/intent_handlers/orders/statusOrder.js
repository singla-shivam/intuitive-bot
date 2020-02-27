const {getLastOrder} = require('../../database/orders')
const {getFormattedDate} = require('../../utils')

/**
 *
 * @param {WebhookClient} agent
 * @return {Promise<void>}
 */
async function getOrderStatus(agent) {
  const result = await getLastOrder(agent)
  if (result.length === 0) {
    agent.add("You have order nothing recently")
    return
  }
  const {ordered} = result[0]
  const nextDay = new Date(ordered + 24 * 60 * 60 * 1000)
  console.log(new Date().getDate(), nextDay)
  if (Date.now() - ordered <= 24 * 60 * 60 * 1000) {
    // not delivered
    const day = nextDay.getDate() === new Date().getDate() ? 'today' : 'tomorrow'
    agent.add(`Your order will be delivered ${day}`)
  }
  else {
    agent.add(`Your order was be delivered on ${getFormattedDate(nextDay, false)}`)
  }
}

module.exports = {getOrderStatus}