const {getData, addData} = require('./api')

/**
 *
 * @param {string} sessionId
 * @param {{product_id: string, quantity: number}[]} cart
 * @return {Promise<T[]>}
 */
exports.setCart = async function (sessionId, cart) {
  let promises = cart.map(product =>
    addData({
        path: `sessions/${sessionId}/cart/${product.product_id}`,
        value: product
      },
      false
    )
  )
  return await Promise.all(promises)
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
  )[0]
}
