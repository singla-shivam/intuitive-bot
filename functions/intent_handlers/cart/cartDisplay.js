const {getProducts} = require("../../database/product");
const {getCart} = require("../../database/cart");

exports.cartDisplay = async function (agent) {
  console.log("cartDisplay Invoked");
  let cartItems = await getCart(agent) // returns {product_id: string, quantity: number}[]
  let cartItemDetails = await getProducts(cartItems.map(
    (item) => item.product_id))

  let totalItems = 0
  let totalPrice = 0
  let response

  // Calculate total price and no of items
  for (let i = 0; i < cartItems.length; i++) {
    totalItems += cartItems[i].quantity
    totalPrice += cartItems[i].quantity * cartItemDetails[i].price
  }
  // Generate response for agent
  if (totalItems) {
    response = `You have total ${totalItems} item${totalItems > 1 ? 's' : ''} in your cart amounting to Rs. ${totalPrice}`
    cartItemDetails.forEach((item, index) =>
      agent.add(`${index + 1}. ${item.name},  Rs.${item.price}/item,  Qty: ${cartItems[index].quantity}`)
    )
  } else {
    response = "Your cart is empty. Ask me to add something?"
  }

  agent.add(response);
}
