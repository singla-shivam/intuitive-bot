const {setCartItem} = require("../../database/cart");

/**
 * Test function for adding dummy item to cart
 */
exports.choomantar = async function (agent){
  console.log("choomantar Invoked");
  await setCartItem(agent, '5iixdS3RQ2bbV9dTH4PD\n', 4)
  agent.add("Four Dairy Milk are now in your cart")
}
