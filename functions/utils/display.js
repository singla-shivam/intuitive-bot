// import {OptionItems} from "actions-on-google/src/service/actionssdk/conversation/helper/option/option";

const {BrowseCarousel, BrowseCarouselItem, Image, DialogflowConversation, BasicCard, List} = require('actions-on-google');
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

    _startConv(agent, message, new Carousel({
      title: 'Ordered',
      items
    }))
  }
}

/**
 *
 * @param {WebhookClient} agent
 * @param {Product} product
 * @param {string} message
 * @param {number} quantity
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
 * @param {Order} order
 * @param {Product[]} products
 */
function showListOfOrders(agent, order, products) {
  const items = {}
  products.forEach(p => {
    items[p.product_id] = {
      title: p.name,
      description: p.price,
      image: new Image({
        url: p.imageUrl,
        alt: p.name
      }),
    }
  })
  let price = 0
  for (let productId in order.items) {
    price += order.items[productId].price * order.items[productId].quantity
  }
  let message = `Ordered on ${getFormattedDate(order.ordered)} total of Rs. ${price}`
  let list = new List({
    title: "Recent Orders",
    items
  })

  _startConv(agent, message, list)
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
