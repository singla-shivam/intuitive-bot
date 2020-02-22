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
 * @param {string | number} value
 * @param {boolean} [time = true]
 * @return {string}
 */
function getFormattedDate(value, time = true) {
  if (typeof value === 'number' || typeof value === 'string') {
    const date = new Date(value)
    const d = date.getDate().toString().padStart(2, '0')
    const m = MONTHS[date.getMonth()]
    const hr = date.getHours().toString().padStart(2, '0')
    const min = date.getMinutes().toString().padStart(2, '0')
    return `${d}, ${m}${time ? ` at ${hr}:${min}` : ''}`
  }

}

module.exports = {getSessionId, getFormattedDate}