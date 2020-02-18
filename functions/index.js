// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
// hello world comment 2
'use strict';

const functions = require('firebase-functions');
const {cartDisplay} = require('./intent_handlers/cart/cartDisplay')
const {choomantar} = require('./intent_handlers/productDiscovery/choomantar')
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

const {updateTag} = require('./entities/tag')
const {updateBrand} = require('./entities/brand')
const {addData} = require('./database/api')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(async (request, response) => {
    const agent = new WebhookClient({request, response});
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    //intentMap.set('order.product', addItemsToCart);
    intentMap.set('cart.display', cartDisplay);
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
            updateBrand(data.brand),
            updateTag(data.tags)
        ])
    })

exports.test = functions.https.onRequest(async (req, res) => {
    if (req.query["key"] === "JJypXlJ0tvLq5tbgx8TA") {
        await addData({
            path: "products",
            value: {
                brand: "nya_brand2",
                name: "product_ka_nam",
                tags: [
                    "tag1",
                    "tag2"
                ],
                variant: ["choco", "choco2"]
            },
        }, "product_id")
    }
})
