const {getData, addData} = require('./api')

const CART_ROOT_COLLECTION = "sessions"

/**
 * Resets the whole items in the cart with [cart] associated with [sessionId]
 * @param {string} sessionId
 * @param {{product_id: string, quantity: number}[]} cart
 * @return {Promise<T[]>}
 */
exports.setCart = async function (sessionId, cart) {
  let promises = cart.map(product =>
    addData({
        path: `${CART_ROOT_COLLECTION}/${sessionId}/cart/${product.product_id}`,
        value: product
      },
      false
    )
  )
  return await Promise.all(promises)
}

/**
 * Remove single product with id [productId] from the cart associated with [sessionId]
 * @param {string} sessionId
 * @param {string} productId
 * @return {Promise<T>}
 */
exports.removeCartItem = async function (sessionId, productId) {
  return await _removeCartItem(sessionId, productId)
}

/**
 * Clears the cart associated with [sessionId]
 * @param {string} sessionId
 * @return {T[]}
 */
exports.clearCart = async function (sessionId) {
  // retrieve all the products present in the cart
  const products = await getData({
    path: `${CART_ROOT_COLLECTION}/${sessionId}/cart`
  })
  // remove products from the cart one by one
  let promises = products.map(productId => _removeCartItem(sessionId, productId))
  return await Promise.all(promises)
}

/**
 * Updates quantity of a product of the cart associated with [sessionId]
 * @param {string} sessionId
 * @param {string} productId
 * @param {string} quantity
 * @return {Promise<T>}
 */
exports.setCartItem = async function (sessionId, productId, quantity) {
  return await addData({
    path: `${CART_ROOT_COLLECTION}/${sessionId}/cart/${productId}`,
    value: {
      quantity
    },
  })
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
 * @param {string} sessionId
 * @return {Promise<{product_id: string, quantity: number}[]>}
 */
exports.getCart = async function (sessionId) {
  return (
    await getData({
      path: `sessions/${sessionId}/cart`
    })
  )
}
