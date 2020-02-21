const { findProductsByTags } = require('../../database/product')


exports.categories = async function (agent) {
  console.log("INSIDE CATEGORIES")
  let { tag } = agent.parameters;
  tag = Array.isArray(tag) === false ? new Array(tag) : tag
  console.log(tag)
  const products = await findProductsByTags(tag);
  console.log(products)
  response = "Anything else do you need sir!"
  if (products.length === 0) {
    // fallback
    response = "Sorry, your product is not available " + tag.toString();
  }
  else {
    response = "Can you please choose from one of these -"
    for (var i = 0; i < products.length; i++) {
      response += `${products[i].name}, `
    }
  }
  agent.add(response)
}