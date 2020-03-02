const {findProductsByTags} = require('./../../database/product')
const {checkTV, clarifyProductForFAQ, setContextForCartConfirm, getAllTags, getOrdinal} = require('../../utils')
const {Suggestion} = require('dialogflow-fulfillment')
/**
 *
 * @param {WebhookClient} agent
 * @return {Promise<void>}
 */
async function handleYoutubeIntent(agent) {
  console.log("youtube Invoked", JSON.stringify(agent.parameters))
  const tags = getAllTags(agent.parameters.tags, agent.parameters.newTags)
  console.log('youtube', tags)
  if(!checkTV(tags)) {
    agent.add("FAQ are supported only on TV")
    return
  }
  const ordinal = getOrdinal(agent)
  const products = await findProductsByTags(tags)
  let quantity = agent.parameters.quantity
  quantity = quantity === '' ? undefined : quantity

  const index = (!ordinal || ordinal > products.length)
    ? undefined
    : ordinal - 1

  // if the ordinal was passed or only one product was fetched using the passed tags
  if (index !== undefined || products.length === 1) {
    let product = products[index || 0]
    if(product.smart_tv) {
      agent.add(`Yes, you can stream videos from YouTube, Netflix, Prime Video and Hotstar.`)
      agent.add(new Suggestion('Add to cart'))
      setContextForCartConfirm(agent, tags, quantity, ordinal)
    }
    else {
      agent.add(`No it does support`)
      new Suggestion('Show smart tvs')
    }
    setContextForCartConfirm(agent, tags, quantity, ordinal, 'faq', 'youtube')
  } else {
    clarifyProductForFAQ(agent, tags, quantity, 'faq', 'youtube')
  }
}

module.exports = {handleYoutubeIntent}
