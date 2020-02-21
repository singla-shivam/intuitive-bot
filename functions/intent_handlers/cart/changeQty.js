const {findProductsByTags, getProducts} = require("../../database/product");
const {getCart, setCartItem, removeCartItem} = require("../../database/cart");

exports.cartReceiveExtraTags = async function (agent) {
  console.log("cartRecieveExtraTags Invoked");
  let tags = agent.parameters.tags || [] // Tags from previous request
  let extra_tags = agent.parameters.newTags || [] // Additional tags provided
  let qty = agent.parameters.quantity // Pass on quantity from context
  await _modifyItemQty(agent, [...tags, ...extra_tags], qty)
}

exports.cartChangeQty = async function (agent) {
  console.log("cartChangeQty Invoked");
  let tags = agent.parameters.tag
  let qty = agent.parameters.quantity
  await _modifyItemQty(agent, tags, qty)
}

exports.cartRemoveItem = async function (agent) {
  let tags = agent.parameters.tag
  await _modifyItemQty(agent, tags, 0)
}

async function _modifyItemQty(agent, tags, quantity) {
  let cartItems = await getCart(agent)
  let products = await findProductsByTags(tags, cartItems.map((item) => item.product_id))
  console.log("Modify Item Qty", tags, quantity, products)

  if (await _clarifyWhichProduct(agent, products, quantity, tags) && await _clarifyQuantity(agent, quantity, products)) {
    if (quantity > 0) {
      await setCartItem(agent, products[0].product_id, quantity)
      agent.add(`Sure thing! Now there ${quantity > 1 ? 'are' : 'is'} ${quantity} ${products[0].name} in your cart.`)
    } else {
      await _deleteItem(agent, products)
    }
  }
}

async function _deleteItem(agent, products) {
  await removeCartItem(agent, products[0].product_id)
  agent.add(`I have removed ${products[0].name} from your cart. Anything else?`)
}

async function _clarifyQuantity(agent, quantity, products) {
  if (quantity === undefined) {
    // User didn't provided quantity
    agent.add(`How many ${products[0].name} do you need?`)
    agent.context.set("cart_qty_request", 2, {tags})
  }
  return quantity !== undefined // True only when quantity provided
}

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
