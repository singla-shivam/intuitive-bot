const {getProducts} = require("../../database/product")

/**
 * Helper method that requests user for more clarity on the product they intended in the request
 * @param {WebhookClient} agent
 * @param {Product[]} products
 * @param params will be {
 *   tags,
 *   quantity,
 *   action: 'cart' or 'discovery' (depending on who invoked this method, {extraTagsReceiver.js} will take action)
 * }
 * @return true if we have figured out a single product that user meant to say, false otherwise
 */
async function clarifyWhichProduct(agent, products, params) {
  if (products.length === 1) {
    return true // Just one product, no clarification needed
  } else if (products.length === 0) {
    // User either didnt said product name, or product is not found in cart
    agent.add(`Alright, Please tell me the product name.`)
  } else {
    // Customising replies based on calling
    if (agent.parameters.action === "cart") {
      // Ask for clarifying which item did user meant to say
      agent.add(`Which of the following items did you meant?`)
    } else if (agent.parameters.action === "discovery") {
      // Display relevant products
      agent.add(`I have found a few products. Which one would you like to order?`)
    }
    let productDetails = await getProducts(products.map((item) => item.product_id))
    for (let i = 0; i < min(6, products.length); i++) {
      agent.add(`${i + 1}. ${productDetails[i].name}`)
    }
  }
  // Request for additional tags if we couldn't get down to a single product
  agent.context.set("extra_tag_request", 2, params)
  return false
}

module.exports = {clarifyWhichProduct}