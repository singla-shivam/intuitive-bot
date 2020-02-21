const {setCartItem} = require("../../database/cart");

/**
 * Test function for adding dummy item to cart
 */
exports.choomantar = async function (agent){
  console.log("choomantar Invoked");
  await setCartItem(agent, 'pLOhXIlTI78WjMLAlShX', 4)
  agent.add("Four kitkat are now in your cart")
}
