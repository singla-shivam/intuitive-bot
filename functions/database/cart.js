const {getData, addData} = require('./api')
const {getSessionId} = require('./../utils')

const CART_ROOT_COLLECTION = "sessions"

/**
 * Resets the whole items in the cart with [cart] associated with [sessionId]
 * @param {WebhookClient} agent
 * @param {{product_id: string, quantity: number}[]} cart
 * @return {Promise<T[]>}
 */
exports.setCart = async function (agent, cart) {
  let promises = cart.map(product =>
    addData({
        path: `${CART_ROOT_COLLECTION}/${getSessionId(agent)}/cart/${product.product_id}`,
        value: product
      },
      false
    )
  )
  return await Promise.all(promises)
}

/**
 * Remove single product with id [productId] from the cart associated with [sessionId]
 * @param {WebhookClient} agent
 * @param {string} productId
 * @return {Promise<T>}
 */
exports.removeCartItem = async function (agent, productId) {
  return await _removeCartItem(getSessionId(agent), productId)
}

/**
 * Clears the cart associated with [sessionId]
 * @param {WebhookClient} agent
 * @return {T[]}
 */
exports.clearCart = async function (agent) {
  // retrieve all the products present in the cart
  const products = await getData({
    path: `${CART_ROOT_COLLECTION}/${getSessionId(agent)}/cart`
  })
  // remove products from the cart one by one
  let promises = products.map(productId => _removeCartItem(getSessionId(agent), productId))
  return await Promise.all(promises)
}

/**
 * Updates quantity of a product of the cart associated with [sessionId]
 * @param {WebhookClient} agent
 * @param {string} productId
 * @param {string} quantity
 * @return {Promise<T>}
 */
exports.setCartItem = async function (agent, productId, quantity) {
  return await addData({
      path: `${CART_ROOT_COLLECTION}/${getSessionId(agent)}/cart/${productId}`,
      value: {
        quantity
      }
    },
    "product_id"
  )
}

/**
 *
 * @param {string} sessionId
 * @param {string} productId
 * @return {Promise<T>}
 * @private
 */
function _removeCartItem(sessionId, productId) {
  return addData({
    path: `${CART_ROOT_COLLECTION}/${sessionId}/cart/${productId}`,
    delete: true
  })
}

/**
 *
 * @param {WebhookClient} agent
 * @return {Promise<{product_id: string, quantity: number}[]>}
 */
exports.getCart = async function (agent) {
  return (
    await getData({
      path: `sessions/${getSessionId(agent)}/cart`
    })
  )
}
