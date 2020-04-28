const {Suggestion} = require('dialogflow-fulfillment')
/**
 *
 * @param {WebhookClient} agent
 * @param {Product} product
 * @return {Promise<void>}
 */
async function handleYoutubeIntent(agent, product) {
  if(product.smart_tv) {
    agent.add(`Yes, you can stream videos from YouTube, Netflix, Prime Video and Hotstar.`)
    agent.add(new Suggestion('Add to cart'))
  }
  else {
    agent.add(`No it does support`)
    new Suggestion('Show smart tvs')
  }
}

module.exports = {handleYoutubeIntent}
