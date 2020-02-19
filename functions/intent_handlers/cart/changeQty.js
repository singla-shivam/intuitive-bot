const {findProductsByTags, getProducts} = require("../../database/product");
const {getCart, setCartItem} = require("../../database/cart");

exports.cartChangeQty = async function (agent) {
  console.log("cartChangeQty Invoked");
  let cartItems = await getCart(agent)
  let tags = agent.parameters.tag
  let qty = agent.parameters.quantity
  let products = await findProductsByTags(tags, cartItems.map((item) => item.product_id))
  console.log(tags, qty, products)
  if (products.length === 1) {
    let productName = await getProducts(products[0].product_id)
    await setCartItem(agent, products[0].product_id, qty)
    agent.add(`Sure thing! There ${qty > 1 ? 'are' : 'is'} ${qty} ${productName} in your cart`)
  } else if (products.length) {
    agent.add(`Please tell me the item whose quantity you wish to change?`)
  } else {
    agent.add(`Which of the following items are you talking about?`)
    let productDetails = await getProducts(products.map((item) => item.product_id))
    for (let i = 0; i < products.length; i++) {
      agent.add(`${i + 1}. ${productDetails[i].name}`)
    }
  }
  agent.add(response);
}
