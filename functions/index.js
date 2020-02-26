const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');

const {choomantar, choomantar2} = require('./intent_handlers/productDiscovery/choomantar')

const {listRecentOrders, findOrders} = require('./intent_handlers/orders/listOrder')
const {placeOrder} = require('./intent_handlers/orders/placeOrder')
const {getOrderStatus} = require('./intent_handlers/orders/statusOrder')

const {addData} = require('./data')

const {findProduct, confirmCartAdd} = require("./intent_handlers/productDiscovery/findProduct")

const {Card, Suggestion} = require('dialogflow-fulfillment');
const {cartDisplay} = require('./intent_handlers/cart/cartDisplay')
const {order, _orderTests, order_confirm} = require('./intent_handlers/productDiscovery/order');
const {categories} = require('./intent_handlers/productDiscovery/category')
const {updateEntityOnProductAdd} = require('./entities/tag')
const {extraTagsReceiver} = require('./intent_handlers/genericMethods/extraTagsReceiver')
const {cartChangeQty, cartRemoveItem, cartConfirmQty, clearCart} = require("./intent_handlers/cart/changeQty");
const {updateTag} = require('./entities/tag')
// const {addProduct, findProductsByTags} = require('./database/product')
// const {getData} = require('./database/api')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(async (request, response) => {
  const agent = new WebhookClient({request, response});
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
    agent.add(`How may I help you.`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  // Product discover related methods
  intentMap.set('discover.find_product', findProduct);
  intentMap.set('price.check', findProduct); // Merged to reduce complexity
  // Duplicate intentions, similar logic req. for handling requests
  intentMap.set('discover.confirm_add_cart', confirmCartAdd);
  intentMap.set('discover.confirm_add_cart_with_qty', confirmCartAdd);
  // Cart related methods
  intentMap.set('cart.display', cartDisplay);
  intentMap.set('cart.changeQty', cartChangeQty);
  intentMap.set('cart.clear', clearCart);
  intentMap.set('receive_extra_tags', extraTagsReceiver);
  intentMap.set('cart.confirmQty', cartConfirmQty);
  intentMap.set('cart.remove-item', cartRemoveItem);
  intentMap.set('choomantar', choomantar);
  //intentMap.set('cart.display - yes', confirmOrder);
  intentMap.set('Orders.recent', listRecentOrders)
  intentMap.set('Orders.recent.showMore', listRecentOrders)
  intentMap.set('Orders.find', findOrders)
  intentMap.set('Orders.place', placeOrder)
  intentMap.set('Orders.status', getOrderStatus)

  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  await agent.handleRequest(intentMap);
});

exports.entityUpdate = functions.firestore
  .document('products/{productId}')
  .onCreate(async (document, context) => {
    const productId = context.params["productId"]
    const data = document.data()
    console.log("created product", JSON.stringify(data))
    return await updateEntityOnProductAdd(data)
  })

exports.addData = functions.https.onRequest(async (req, res) => {
  if (req.query["key"] === "JJypXlJ0tvLq5tbgx8TA") {
    return await addData()
  }
})

exports.test = functions.https.onRequest(async (req, res) => {
  if (req.query["key"] === "JJypXlJ0tvLq5tbgx8TA") {
    await updateEntityOnProductAdd({
      name: "OnePlus 55 inch QLED TV",
      price: 69899,
      brand: "OnePlus"
    })
  }
})
