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
  let price = 0
  let quantity = 0
  for(let i in order.items){
    price += order.items[i].price * order.items[i].quantity
    quantity += order.items[i].quantity
  }

  await addOrders(agent, order)
  await clearCart(agent)
  agent.add(`Your oder amounting to Rs.${price} has been placed. ${quantity} items will be delivered to you within next 24 hours.`)
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
