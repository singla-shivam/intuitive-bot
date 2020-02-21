const {setCartItem} = require("../../database/cart")
const {addOrders} = require("../../database/orders");

/**
 * Test function for adding dummy item to cart
 */
exports.choomantar = async function (agent){
  console.log("choomantar Invoked");
  await setCartItem(agent, 'pLOhXIlTI78WjMLAlShX', 4)
  agent.add("Four kitkat are now in your cart")
}

/**
 * Test function for ordering dummy items
 */
exports.choomantar2 = async function (agent){
  console.log("choomantar2 Invoked");
  await addOrders(agent, {
    items: {
      "2YR9z8moKlknDkXwomVk": true,
      "4GAXZjKJVYwqH4zmjfnu": true
    }
  })
  agent.add("Your order has been placed order")
}
