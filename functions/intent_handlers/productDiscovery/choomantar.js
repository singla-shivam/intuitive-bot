const {setCartItem} = require("../../database/cart")
const {addOrders} = require("../../database/orders");

/**
 * Test function for adding dummy item to cart
 */
exports.choomantar = async function (agent) {
  console.log("choomantar Invoked");
  await setCartItem(agent, '0MgbR9BRPNK96zmf0pL2', 2)
  await setCartItem(agent, '1pM6gsqoGYpJHWqJNHxd', 3)
  agent.add("Cart added")
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
