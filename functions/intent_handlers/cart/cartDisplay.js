const {getProducts} = require("../../database/product");
const {getCart} = require("../../database/cart");

exports.cartDisplay = async function (agent){
  console.log("cartDisplay Invoked");
  let sessionId = agent.request_.body.session
  let cartItems = await getCart(sessionId) // {product_id: string, quantity: number}[]
  let cartItemDetails = await getProducts(cartItems.map((item) => item.product_id ))
  let totalItems = 0;
  let totalPrice = 0;
  let response
  // Calculate total price and no of items
  for (let i = 0; i<cartItems.length; i++){
    totalItems += cartItems[i].quantity
    totalPrice += cartItems[i].quantity*cartItemDetails[i].price
  }
  // Generate responses for agent
  if (totalItems){
    response = `You have total ${totalItems} item${totalItems>1?'s':''} in your cart amounting to Rs. ${totalPrice}.\n`
    response += cartItemDetails.map((item, index) => `${index+1}. ${item.name}, Qty:${cartItems[index].quantity}`).join('\n')
  } else {
    response = "Your cart is empty. Ask me to add something?"
  }

  agent.add(response);
}
