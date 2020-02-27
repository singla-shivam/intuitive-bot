const {getSessionId} = require('../../utils')
const {getCart, clearCart} = require('../../database/cart')
const {getProducts} = require('../../database/product')
const {addOrders} = require('../../database/orders')

async function placeOrder(agent) {
  const cartItems = await getCart(agent)
  if (cartItems.length === 0) {
    agent.add("Your cart is empty")
    agent.add("Ask me to add something")
    return
  }
  /** @type Product[] */
  const cartItemDetails = await getProducts(
    cartItems.map(item => item.product_id)
  )

  /** @type Order */
  const order = {
    items: _getOrderItems(cartItems, cartItemDetails)
  }
  console.log(order)

  await addOrders(agent, order)
  await clearCart(agent)
  agent.add("Your ordered has been placed.")
  agent.add("Thank you for shopping with us. 😀")

}

/**
 *
 * @param {object[]} cartItems
 * @param {Product[]} cartItemDetails
 * @return {object}
 * @private
 */
function _getOrderItems(cartItems, cartItemDetails) {
  const orderItems = {}
  cartItems.forEach(item => orderItems[item.product_id] = item)
  cartItemDetails.forEach(item => {
    orderItems[item.product_id].price = item.price
  })
  return orderItems
}

module.exports = {placeOrder}
