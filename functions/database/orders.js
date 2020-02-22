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
 * @property {number} ordered
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
    limit: 3,
  }
  if (last) options.startAfter = last
  return await getData(options)
}

/**
 *
 * @param {WebhookClient} agent
 * @param {Order} order
 * @return {Promise<void>}
 */
async function addOrders(agent, order) {
  order.sessionId = getSessionId(agent)
  order.ordered = Date.now() + 330 * 60 * 1000
  await addData({
    path: "orders",
    value: order,
  })
}

/**
 * @param {WebhookClient} agent
 * @param {string} dateString
 * @param {string} [endDateString]
 * @return {Promise<Order[]>}
 */
async function getOrdersByDate(agent, dateString, endDateString = undefined) {
  const sessionId = getSessionId(agent)
  const dateMillis = new Date(dateString).getTime()
  const startTime = endDateString ? dateMillis : dateMillis - 12 * 60 * 60 * 1000
  const endTime = endDateString ? new Date(endDateString).getTime() : dateMillis + 12 * 60 * 60 * 1000
  // ["ordered", ">=" , dateMillis - 12 * 60 * 60 * 1000],
  return await _getOrdersByDate(sessionId, startTime, endTime)
}

/**
 * @param {WebhookClient} agent
 * @return {Promise<Order[]>}
 */
async function getLastOrder(agent) {
  const sessionId = getSessionId(agent)
  const andQueries = [
    ["sessionId", "==", sessionId],
  ]
  return await _createGetOrderQuery(andQueries, 1)
}

/**
 *
 * @param {string} sessionId
 * @param {number} startTime
 * @param {number} endTime
 * @return {Promise<Order[]>}
 * @private
 */
async function _getOrdersByDate(sessionId, startTime, endTime) {
  const andQueries = [
    ["sessionId", "==", sessionId],
    ["ordered", ">=", startTime],
    ["ordered", "<", endTime]
  ]
  return _createGetOrderQuery(andQueries)
}

/**
 *
 * @param {AndQuery[]} andQueries
 * @param {number} [limit=3]
 * @return {Promise<Order[]>}
 * @private
 */
async function _createGetOrderQuery(andQueries, limit = 3) {
  return getData({
    path: "orders",
    orderBy: {
      direction: "desc",
      field: "ordered"
    },
    andQueries,
    limit
  })
}

module.exports = {getRecentOrders, addOrders, getOrdersByDate, getLastOrder}
