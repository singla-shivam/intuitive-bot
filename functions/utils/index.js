const {Suggestion} = require('dialogflow-fulfillment')
const {getProducts} = require("../database/product")
const {showCarousel} = require("./display")
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/**
 * Retrieves session id from the agent
 * @param {WebhookClient} agent
 * @returns {string} - returns session Id
 * @private
 */
function getSessionId(agent) {
  const session = agent.request_.body.session
  return session.slice(session.lastIndexOf('/') + 1)
}

/**
 * Returns formatted date in 23 Feb at 13:00 if [time] is true or 23 Feb if [time] is false
 * @param {string | number | Date} value
 * @param {boolean} [time = true]
 * @return {string}
 */
function getFormattedDate(value, time = true) {
  /** @type Date */
  let date
  if (typeof value === 'number' || typeof value === 'string') date = new Date(value)
  else date = value

  const d = date.getDate().toString().padStart(2, '0')
  const m = MONTHS[date.getMonth()]
  const hr = date.getHours().toString().padStart(2, '0')
  const min = date.getMinutes().toString().padStart(2, '0')
  return `${d}, ${m}${time ? ` at ${hr}:${min}` : ''}`

}

/**
 * Concatenates two arrays of tags
 * @param {string[]} oldTags
 * @param {string[]} newTags
 */
function getAllTags(oldTags, newTags) {
  const tags = oldTags.concat(newTags || [])
  return Array.from(new Set(tags))
}

/**
 * Returns correct ordinal
 * @param {WebhookClient} agent
 * @return {number}
 */
function getOrdinal(agent) {
  return agent.parameters.ordinal ? agent.parameters.ordinal : agent.parameters.contextOrdinal
}

/**
 * Returns correct ordinal
 * @param {WebhookClient} agent
 * @param {string} response
 * @return {void}
 */
function showFAQMessage(agent, response) {
  agent.add(response)
}

/**
 * Sets context to clarify product for faq
 * @param {WebhookClient} agent
 * @param {string[]} tags
 * @param {number} quantity
 * @param {string} action
 * @param {string} subAction
 * @param {Product[]} products
 */
async function clarifyProductForFAQ(agent, tags, quantity, action, subAction, products) {
  if(products.length === 1) return true
  else if (products.length === 0) {
    agent.add('Can you please say the product name again?')
    if(tags.length !== 0) tags = []
    agent.context.set("extra_tag_request", 2, {
      tags,
      quantity: quantity,
      action,
      subAction
    })
    agent.context.set("faq", 2, {
      tags,
      quantity,
      action,
      subAction
    })
  }
  else {
    let response = 'Which of the following items did you meant?'
    let productDetails = await getProducts(products.map((item) => item.product_id))
    showCarousel(agent, productDetails.slice(0, 7), response)
  }
  return false
}

/**
 * Sets context to confirm for cart
 * @param {WebhookClient} agent
 * @param {string[]} tags
 * @param {number} quantity
 * @param {number} ordinal
 * @param {string} action
 * @param {string} subAction
 */
function setContextForCartConfirm(agent, tags, quantity, ordinal, action, subAction) {
  agent.context.set("discover_confirm_add_cart", 2, {
    tags,
    quantity,
    ordinal
  })
  agent.context.set("faq", 2, {
    tags,
    quantity,
    ordinal,
    action,
    subAction
  })
}

/**
 * Returns false TV is not found in tags, false otherwise
 * @param {string} tags
 * @return {boolean}
 */
function checkTV(tags) {
  for(let i = 0, len = tags.length; i < len; i++) {
    if(tags[i] === 'TV') return true
  }
  return false
}

module.exports = {getSessionId, getFormattedDate, getAllTags, getOrdinal, showFAQMessage, clarifyProductForFAQ, setContextForCartConfirm, checkTV}