const {getData, addData} = require('./api')
const {getSessionId} = require('../utils')

/**
 * @typedef TimeStamp
 * @type {object}
 * @property {number} seconds
 * @property {number} nanoseconds
 */

/**
 * @typedef Order
 * @type {object}
 * @property {string} id
 * @property {string} sessionId
 * @property {TimeStamp} ordered
 * @property {object} items
 */

/**
 *
 * @param {WebhookClient} agent
 * @param {TimeStamp} [last=undefined]
 * @param {boolean} [next=true]
 * @return {Promise<Order[]>}
 */
async function getRecentOrders(agent, last = undefined, next = true) {
  const sessionId = getSessionId(agent)
  /** @type OptionsGetData */
  const options = {
    path: "orders",
    andQueries: [
      ["sessionId", "==", sessionId]
    ],
    orderBy: {
      direction: "desc",
      field: "ordered"
    },
    limit: 2,
  }
  if(last) options.startAfter = last
  return await getData(options)
}

/**
 *
 * @param {WebhookClient} agent
 * @param {Order} order
 * @return {Promise<void>}
 */
async  function addOrders(agent, order) {
  order.sessionId = getSessionId(agent)
  await addData({
    path: "orders",
    value: order,
    ordered: Date.now()
  })
}

module.exports = {getRecentOrders, addOrders}
