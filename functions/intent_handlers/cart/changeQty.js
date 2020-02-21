const {findProductsByTags, getProducts} = require("../../database/product");
const {getCart, setCartItem, removeCartItem} = require("../../database/cart");

/**
 * This method is invoked when additional tags are requested
 */
exports.cartReceiveExtraTags = async function (agent) {
  let tags = agent.parameters.tags || [] // Tags from previous request
  let extra_tags = agent.parameters.newTags || [] // Additional tags provided
  let qty = agent.parameters.quantity  // Pass on quantity from context
  qty = qty === "" ? undefined : qty // Context sets quantity as empty string when
  // quantity parameter is passed as undefined by intent that activated the context
  // console.log("cartRecieveExtraTags Invoked", tags, extra_tags, qty);
  await _modifyItemQty(agent, [...tags, ...extra_tags], qty)
}

/**
 * This method is invoked when user provides quantity missing in original request
 */
exports.cartConfirmQty = async function (agent) {
  let tags = agent.parameters.tags || [] // Tags from previous request
  let qty = agent.parameters.quantity // Quantity provided by user
  //console.log("confirmQty Invoked", tags, qty);
  await _modifyItemQty(agent, tags, qty)
}

/**
 * This method is invoked when user makes a request to change quantity of an item
 */
exports.cartChangeQty = async function (agent) {
  //console.log("cartChangeQty Invoked");
  let tags = agent.parameters.tags
  let qty = agent.parameters.quantity
  await _modifyItemQty(agent, tags, qty)
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
  let cartItems = await getCart(agent)
  let products = await findProductsByTags(tags, cartItems.map((item) => item.product_id))
  //console.log("Modify Item Qty", tags, quantity, products)

  if (await _clarifyWhichProduct(agent, products, quantity, tags) && await _clarifyQuantity(agent, products, quantity, tags)) {
    if (quantity > 0) {
      await setCartItem(agent, products[0].product_id, quantity)
      agent.add(`Sure thing! Now there ${quantity > 1 ? 'are' : 'is'} ${quantity} ${products[0].name} in your cart.`)
    } else {
      await _deleteItem(agent, products)
    }
  }
}

/**
 * Helper method that deletes a single product from cart
 * @param {Product[]} products must contain only a single product
 */
async function _deleteItem(agent, products) {
  //console.log("_deleteItem", products[0].product_id)
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
    agent.context.set("cart_qty_request", 2, {tags})
  }
  return quantity !== undefined // True only when quantity provided
}

/**
 * Helper method that requests user for more clarity on the product they intended in the request
 * @return true if we have figured out a single product that user meant to say, false otherwise
 */
async function _clarifyWhichProduct(agent, products, quantity, tags) {
  if (products.length === 1) {
    return true // Just one product, no clarification needed
  } else if (products.length === 0) {
    // User either didnt said product name, or product is not found in cart
    agent.add(`Which item's quantity do you want to change?`)
  } else {
    // Ask for clarifying which item did user meant to say
    agent.add(`Which of the following items are you talking about?`)
    let productDetails = await getProducts(products.map((item) => item.product_id))
    for (let i = 0; i < products.length; i++) {
      agent.add(`${i + 1}. ${productDetails[i].name}`)
    }
  }
  // Request for additional tags if we couldn't get down to a single product
  agent.context.set("cart_tag_request", 2, {tags, quantity})
  return false
}
