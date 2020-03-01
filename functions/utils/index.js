const {Suggestion} = require('dialogflow-fulfillment')
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
  return agent.parameters.contextOrdinal ? agent.parameters.contextOrdinal : agent.parameters.ordinal
}

/**
 * Returns correct ordinal
 * @param {WebhookClient} agent
 * @param {string} response
 * @return {void}
 */
function showFAQMessage(agent, response) {
  agent.add(response)
  agent.add(new Suggestion('Add to cart?'))
}

/**
 * Sets context to clarify product for faq
 * @param {WebhookClient} agent
 * @param {string[]} tags
 * @param {number} quantity
 * @param {string} action
 * @param {string} subAction
 */
function clarifyProductForFAQ(agent, tags, quantity, action, subAction) {
  agent.add('Which product you are talking about?')
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

/**
 * Sets context to confirm for cart
 * @param {WebhookClient} agent
 * @param {string[]} tags
 * @param {number} quantity
 * @param {number} ordinal
 */
function setContextForCartConfirm(agent, tags, quantity, ordinal) {
  agent.context.set("discover_confirm_add_cart", 2, {
    tags,
    quantity,
    ordinal
  })
}

/**
 * Returns false TV is not found in tags, false otherwise
 * @param {string} tags
 * @return {boolean}
 */
function checkTV(tags) {
  for(let i = 0, len = tags.length; i < len; i++) {
    if(checkTV[i] === 'TV') return true
  }
  return false
}

module.exports = {getSessionId, getFormattedDate, getAllTags, getOrdinal, showFAQMessage, clarifyProductForFAQ, setContextForCartConfirm, checkTV}