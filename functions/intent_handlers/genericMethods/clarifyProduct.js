const {showCarousel} = require("../../utils/display")
const {getProducts} = require("../../database/product")
const {Suggestion} = require('dialogflow-fulfillment')
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
exports.clarifyWhichProduct = async function (agent, products, params) {
  if (products.length === 1) {
    return true // Just one product, no clarification needed
  } else if (products.length === 0) {
    if (params.action === "cart") {
      // If user didnt said product name
      if (params.tags.length === 0) agent.add(`Alright, Please tell me the product name.`)
      else {
        // Product is not found in cart
        agent.add(`I could not find it in your cart.`)
        params.tags = []
      }
    } else if (params.action === "discovery") {
      if (params.tags.length === 0) {
        agent.add(`Sorry, we don't have it in our store. We sell AC, Refrigerators and TV. What would you like to see?`)
        agent.add(new Suggestion('AC'))
        agent.add(new Suggestion('TV'))
        agent.add(new Suggestion('Refrigerator'))

      } else {
        agent.add(`We don't have something like that in our store yet.`)
        params.tags = []
      }
    }
  } else {
    // Customising replies based on calling
    let response
    if (params.action === "cart") {
      // Ask for clarifying which item did user meant to say
      response = (`Which of the following items did you meant?`)
    } else if (params.action === "discovery") {
      // Display relevant products
      response = (`I have found a few products from our store.`)
    }
    let productDetails = await getProducts(products.map((item) => item.product_id))
    for (let i = 0; i < Math.min(6, products.length); i++) {
      agent.add(`${i + 1}. ${productDetails[i].name}`)
    }
    //showCarousel(agent, productDetails.slice(0, 7), response)
    agent.add(response)
    if (products.length > 5) {
      agent.add(`Do you prefer any specific brand?`)
      let brands = _extractBrands(productDetails)
      console.log(brands)
      brands.forEach((brand) => agent.add(new Suggestion(brand)))
    }
  }
  // Request for additional tags  if we couldn't get down to a single product
  agent.context.set("extra_tag_request", 1, params)
  return false
}

function _extractBrands(productDetails) {
  console.log(productDetails)
  let brands = new Set()
  for (let i = 0; i < productDetails.length; i++) {
    let brand = productDetails[i].brand
    if (!brands.has(brand)) brands.add(brand)
  }
  return brands
}
