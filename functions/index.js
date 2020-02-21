// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
// hello world comment 2
'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const {cartDisplay} = require('./intent_handlers/cart/cartDisplay')
const {cartChangeQty, cartReceiveExtraTags, cartRemoveItem} = require("./intent_handlers/cart/changeQty");
const {choomantar} = require('./intent_handlers/productDiscovery/choomantar')
const {order, _orderTests} = require('./intent_handlers/productDiscovery/order');
const {updateTag} = require('./entities/tag')
// const {addProduct, findProductsByTags} = require('./database/product')
// const {getData} = require('./database/api')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(async (request, response) => {
  const agent = new WebhookClient({ request, response });
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
  //NTC PART Begin
  intentMap.set('Order', order);
  //NTC PART END
  //intentMap.set('order.product', addItemsToCart);
  intentMap.set('cart.display', cartDisplay);
  intentMap.set('cart.changeQty', cartChangeQty);
  intentMap.set('cart.get_extra_tags', cartReceiveExtraTags);
  intentMap.set('cart.remove-item', cartRemoveItem);
  intentMap.set('choomantar', choomantar);
  //intentMap.set('cart.display - yes', confirmOrder);

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

    return Promise.all([
      updateTag(Object.keys(data.tags))
    ])
  })

exports.test = functions.https.onRequest(async (req, res) => {
  if (req.query["key"] === "JJypXlJ0tvLq5tbgx8TA") {

    // await addProduct("Dairy Milk", "Dairy Milk Silk Bubbly", 70, ["food", "chocolate"])
    // await addProduct("Dairy Milk", "Dairy Milk Fivestar 15gm", 10, ["food", "chocolate"])
    // await addProduct("KitKat", "KitKat 4pc", 20, ["food", "chocolate"])
    // await addProduct("CocaCola", "CocaCola 600ml", 40, ["food", "beverage", "cold drink", "soft drink"])
    // await addProduct("CocaCola", "CocaCola 1Litre", 60, ["food", "beverage", "cold drink", "soft drink"])
    // await addProduct("CocaCola", "CocaCola 2Litre", 110, ["food", "beverage", "cold drink", "soft drink"])

    // let result = await getData({
    //   path: "products/2YR9z8moKlknDkXwomVk"
    // })
    // console.log("result", result)
    // _orderTests();


  }
})
