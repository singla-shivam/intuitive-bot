const {Suggestion} = require('dialogflow-fulfillment')

const {clearCart} = require("../../database/cart")
const {clarifyWhichProduct} = require('../genericMethods/clarifyProduct')
const {findProductsByTags} = require("../../database/product")
const {getCart, setCartItem, removeCartItem} = require("../../database/cart")

/**
 * This method is invoked when user provides quantity missing in original request
 */
exports.cartConfirmQty = async function (agent) {
  let tags = agent.parameters.tags || [] // Tags from previous request
  let quantity = agent.parameters.quantity // Quantity provided by user
  console.log("confirmQty Invoked", tags, quantity);
  await _modifyItemQty(agent, tags, quantity)
}

/**
 * This method is invoked when user makes a request to change quantity of an item
 */
exports.cartChangeQty = async function (agent) {
  console.log("cartChangeQty Invoked");
  let tags = agent.parameters.tags
  let quantity = agent.parameters.quantity
  await _modifyItemQty(agent, tags, quantity)
}

/**
 * This method is invoked when user makes a request to clear the cart
 */
exports.clearCart = async function (agent) {
  await clearCart(agent)
  agent.add(`Sure, I have cleared your cart. Want to add something fresh?`)
}

/**
 * This method is invoked when user makes a request to remove an item from cart
 */
exports.cartRemoveItem = async function (agent) {
  let tags = agent.parameters.tags
  await _modifyItemQty(agent, tags, 0)
}

/**
 * Helper method that finds relevant product on basis of tags provided and
 * sets it's quantity in cart (or deletes if quantity is 0)
 */
async function _modifyItemQty(agent, tags, quantity) {
  quantity = quantity === "" ? undefined : quantity // Context sets quantity as empty string when
  // quantity parameter is passed as undefined by intent that activated the context
  let cartItems = await getCart(agent)
  let products = await findProductsByTags(tags, cartItems.map((item) => item.product_id))
  console.log("Modify Item Qty", tags, quantity, products, cartItems)
  let action = `cart`
  // Proceed only if we have a single product and a quantity w
  if (await clarifyWhichProduct(agent, products, {quantity, tags, action})
    && await _clarifyQuantity(agent, products, quantity, tags)) {
    if (quantity > 0) {
      await setCartItem(agent, products[0].product_id, quantity)
      agent.add(`Sure thing! Now there ${quantity > 1 ? 'are' : 'is'} ${quantity} ${products[0].name} in your cart.`)
      agent.add(new Suggestion('Show cart'))
      agent.add(new Suggestion('Place order'))
    } else {
      await _deleteItem(agent, products)
    }
  }
}

/**
 * Helper method that deletes a single product from cart
 * @param {WebhookClient} agent
 * @param {Product[]} products must contain only a single product
 */
async function _deleteItem(agent, products) {
  console.log("_deleteItem", products[0].product_id)
  await removeCartItem(agent, products[0].product_id)
  agent.add(`I have removed ${products[0].name} from your cart. Anything else?`)
}

/**
 * Helper method that requests user for quantity when it is missing from request
 * @return true if quantity is present in original request, otherwise false
 */
async function _clarifyQuantity(agent, products, quantity, tags) {
  if (quantity === undefined) {
    // User didn't provided quantity
    agent.add(`How many ${products[0].name} do you need?`)
    agent.context.set("cart_qty_request", 1, {tags})
  }
  return quantity !== undefined // True only when quantity provided
}
