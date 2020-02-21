const {getData} = require('./api')
const {getSessionId} = require('./')

/**
 * @typedef TimeStamp
 * @type {object}
 * @property {number} seconds
 * @property {number} nanoseconds
 */

/**
 * @typedef Order
 * @type {object}
 * @property {string} sessionId
 * @property {TimeStamp} ordered
 */
/**
 * @param {WebhookClient} agent
 * @return {Promise<Order[]>}
 */
async function getRecentOrders(agent) {
  const sessionId = getSessionId(agent)
  return await getData({
    path: "orders",
    andQueries: [
      ["sessionId", "==", sessionId]
    ],
    orderBy: {
      direction: "desc",
      field: "ordered"
    },
    limit: 3
  })
}

module.exports = {getRecentOrders}
