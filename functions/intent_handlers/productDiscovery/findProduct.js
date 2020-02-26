const {getCart, setCartItem} = require("../../database/cart")
const {clarifyWhichProduct} = require("../genericMethods/clarifyProduct")
const {findProductsByTags} = require("../../database/product")

/**
 * This function is invoked when user gives his consent to add requested product to cart
 */
exports.confirmCartAdd = async function (agent) {
  let {tags, newQuantity, quantity, ordinal} = agent.parameters
  let products = await findProductsByTags(tags)
  // Update old quantity with new one if it present in query otherwise use the old one
  newQuantity = newQuantity === "" ? undefined : newQuantity
  quantity = newQuantity ? newQuantity : quantity === "" ? 1 : quantity
  // Select the first (*and only) product if ordinal is absent or not valid
  let index = ordinal === "" || ordinal > products.length ? 0 : ordinal - 1
  let product = products[index]
  let cart = await getCart(agent)
  let response = `I have added ${quantity} ${product.name} to your cart.`
  // Check if item already present in cart, If yes increase it's quantity
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product_id === product.product_id) {
      quantity += cart[i].quantity
      response = `${product.name} was already in your cart. I have updated it's quantity to ${quantity}`
    }
  }

  await setCartItem(agent, product.product_id, quantity)
  agent.add(response)
}

/**
 * This function is invoked when user wants to discover some products
 */
exports.findProduct = async function (agent) {
  console.log("findProduct Invoked");
  let {tags, quantity, ordinal} = agent.parameters
  quantity = quantity === "" ? undefined : quantity
  let products = await findProductsByTags(tags)
  // Index is not undefined when ordinal isn't empty and corresponds to a valid index.
  // Checking with !ordinal because it can be '' or undefined but never 0
  let index = !ordinal ? undefined : 0 <= ordinal - 1 < products.length ? ordinal - 1 : undefined
  let action = 'discovery'
  // Index not undefined implies a correct ordinal is present and we need not clarify the product
  // Otherwise clarifyWhichProduct method will display user with a list of options
  if (index !== undefined || await clarifyWhichProduct(agent, products, {tags, quantity, action})) {
    // User is sure about a product, let's give him some more information
    let product = index ? products[index] : products[0] // Get the correct product
    let response = `${product.name} is available for ordering and `
    if (quantity > 1) response += `${quantity} of them would cost ${product.price * quantity} in total.`
    else response += `costs Rs. ${product.price}.`
    // Ask for their confirmation
    response += ` Would you like to add it to your cart?`
    agent.add(response)
    agent.context.set("discover_confirm_add_cart", 1, {tags, quantity, ordinal})
  }
}