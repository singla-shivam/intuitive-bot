const {getRecentOrders} = require('../../database/orders')

async function listOrders(agent) {
  console.log("called")
  let result = await getRecentOrders(agent)
  agent.add(JSON.stringify(result))
}

module.exports = {listOrders}