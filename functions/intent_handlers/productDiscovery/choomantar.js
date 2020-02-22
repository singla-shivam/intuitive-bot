const {setCartItem} = require("../../database/cart")
const {addOrders} = require("../../database/orders");

/**
 * Test function for adding dummy item to cart
 */
exports.choomantar = async function (agent) {
  console.log("choomantar Invoked");
  await setCartItem(agent, 'pLOhXIlTI78WjMLAlShX', 4)
  agent.add("Four kitkat are now in your cart")
}

/**
 * Test function for ordering dummy items
 */
exports.choomantar2 = async function (agent) {
  console.log("choomantar2 Invoked");
  await addOrders(agent, {
    items: {
      "2YR9z8moKlknDkXwomVk": {
        price: 10,
        quantity: 3
      },
      "4GAXZjKJVYwqH4zmjfnu": {
        price: 20,
        quantity: 4
      }
    }
  })
  agent.add("Your order has been placed order")
}
