const {setCartItem} = require("../../database/cart");

/**
 * Test function for adding dummy item to cart
 */
exports.choomantar = async function (agent){
  let sessionId = agent.request_.body.session
  //console.log(JSON.stringify(agent))
  console.log("choomantar Invoked");
  await setCartItem(sessionId, 'qZFFAVPfMChskcRwxpQZ', 3)
  agent.add("Amul milk 3 packets are now in your cart")
}
