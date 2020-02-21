
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

module.exports = {getSessionId}