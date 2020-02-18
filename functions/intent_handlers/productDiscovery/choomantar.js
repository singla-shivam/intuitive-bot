const {setCartItem} = require("../../database/cart");

/**
 * Test function for adding dummy item to cart
 */
exports.choomantar = async function (agent){
  console.log("choomantar Invoked");
  await setCartItem(agent, 'qZFFAVPfMChskcRwxpQZ', 3)
  agent.add("Amul milk 3 packets are now in your cart")
}
