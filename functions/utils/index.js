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

function getFormattedDate(value) {
  if (typeof value === 'number') {
    const date = new Date(value)
    const d = date.getDate().toString().padStart(2, '0')
    const m = MONTHS[date.getMonth()]
    const hr = date.getHours().toString().padStart(2, '0')
    const min = date.getMinutes().toString().padStart(2, '0')
    return `${d}, ${m} at ${hr}:${min}`
  }
}

module.exports = {getSessionId, getFormattedDate}