const { getData } = require('../../database/api');
const { findProductsByTags, addProduct } = require('../../database/product')

/**
 * Order function for Consumer help
 * @example
 * intentMap.set('Order', order);
 * 
 * @todo More intelligently handle requests
 * @param {Object} agent DialogFlow Webhook
 * @returns {undefined}  
 */

exports.order = async function (agent) {
  // _orderTests();
  console.log('INSIDE ORDER')
  let { tag, number } = agent.parameters;
  number = number == '' ? 1 : number;
  console.log(tag, number)
  const products = await findProductsByTags(tag);
  console.log(products)
  let response = await _orderResponse(products, tag, number);
  console.log(response)
  agent.add(response);
}

exports.order_confirm = async function (agent) {
  console.log('order confirm step ', agent)
  let { tag, number } = agent.queryResult.outputContexts;
  console.log(tag, number)
  const products = await findProductsByTags(tag);
  console.log(products)
  if (products.length === 1) {
    agent.add(` Thank You for your order of ${products[0].name} [ ${number} units] `)
    // Place order
  }
  else {
    agent.add(' How may I help you with' + tag.toString());
  }
}

/**
 * Input some testcases 
 */

async function _orderTests() {
  await addProduct("Amul", "Amul 1Litre", 110, ["milk", "1liter", "Brand"])
  await addProduct("Amul", "Amul 600ml", 110, ["milk", "600ml", "Brand"])
}

/**
 * @todo Handle conflicts case
 * @param {Object[]} products 
 * @param {String[]} tag 
 * @param {Number} number 
 * @returns {String} response for agent
 */

async function _orderResponse(products, tag, number) {
  let response = "Sorry, can you be more specific";
  if (products.length == 0) {
    if (tag.length === 0) {
      response = "Sorry, what would you like to order?"
    }
    else {
      response = "Sorry, your product is not available " + tag.toString();
    }
  }
  else if (products.length === 1) {
    const { brand, name, price } = products[0]
    response = "Your order of " + name + `[ ${number} units ]. Are you sure about it?`;
    for (var iter = 0; iter < number; iter++) {
      console.log(`${brand}, ${name}, ${price}, ${tag} ADDED`)
      // addProduct(brand, name, price, tag);
    }
  }
  else {
    response = "Can you please choose from one of these -"
    for (var i = 0; i < products.length; i++) {
      response += `${products[i].name}, `
    }
  }
  return response
}