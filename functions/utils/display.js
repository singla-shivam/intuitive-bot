// import {OptionItems} from "actions-on-google/src/service/actionssdk/conversation/helper/option/option";

const {BrowseCarousel, BrowseCarouselItem, Image, DialogflowConversation, BasicCard, List} = require('actions-on-google')
const {Suggestion} = require('dialogflow-fulfillment')
const {getFormattedDate} = require('../utils');


/**
 *
 * @param {WebhookClient} agent
 * @param {Product | Product[]} products
 * @param {string} message - the message to be shown before the carousel
 * @param {number[]} [quantities=undefined]
 */
function showCarousel(agent, products, message, quantities = undefined) {
  if (!Array.isArray(products)) {
    // if there is only product no need to show carousel
    showProductCard(agent, /** @type Product*/ products, message)
  } else if (products.length === 0) showProductCard(agent, /** @type Product*/ products[0], message, quantities ? quantities[0] : undefined)
  else {
    let items = _createOptionItems(products, quantities)

    _startConv(agent, message, new BrowseCarousel({
      items
    }))
  }
}

/**
 *
 * @param {WebhookClient} agent
 * @param {Product} product
 * @param {string} message
 * @param {number} [quantity]
 */
function showProductCard(agent, product, message, quantity) {
  let card = new BasicCard({
    title: product.name,
    image: new Image({
      url: product.imageUrl,
      alt: product.name
    }),
    display: "CROPPED"
  })
  _startConv(agent, message, card)
}

/**
 *
 * @param {WebhookClient} agent
 * @param {Order[]} orders
 * @param {string} message
 */
function showListOfOrders(agent, orders, message) {
  const items = {}
  orders.forEach(o => {
    let price = 0
    for(let i in o.items){
      price += o.items[i].price * o.items[i].quantity
    }
    items[o.id] = {
      title: `Ordered on ${getFormattedDate(o.ordered)}`,
      description: `Order ID: ${o.id.substr(0, 5)}, Total price: ${price},  No. of items: ${Object.keys(o.items).length}`,
      image: new Image({
        url: 'https://firebasestorage.googleapis.com/v0/b/intuitivebot.appspot.com/o/rsz_screenshot_from_2020-03-01_12-37-01.png?alt=media&token=54616b37-06ed-487a-a85c-8f3153abe0a4',
        alt: 'image'
      })
    }
  })
  let list = new List({
    items
  })

  _startConv(agent, message, list)
  if(orders.length >= 3) agent.add(new Suggestion('Show more'))
}

/**
 * @param {Product[]} products
 * @param {number[]} [quantities=undefined]
 * @returns {BrowseCarouselItem[]}
 * @private
 */
function _createOptionItems(products, quantities = undefined) {
  let items = []

  products.forEach((product, i) => {
    items.push(new BrowseCarouselItem({
      title: product.name,
      url: product.link,
      description: `Price: ${product.price} ${quantities ? "Quantity: " + quantities[i] : ''}`,
      image: new Image({
        url: product.imageUrl,
        alt: product.name
      })
    }))
  })

  return items
}

function _startConv(agent, message, data) {
  let conv = agent.conv() || new DialogflowConversation(agent.request_)
  agent.requestSource = 'ACTIONS_ON_GOOGLE'
  try {
    conv.ask(message)
    conv.ask(data)
    agent.add(conv)
  } catch (e) {
    console.trace(e)
  }
}

module.exports = {showCarousel, showProductCard, showListOfOrders}
