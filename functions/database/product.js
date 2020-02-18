const {getData} = require('./api')

/**
 * @typedef Product
 * @type object
 * @property {string} product_id
 */

/**
 *
 * @param {string | string[]} products - Array of product ids of products to fetched. Can be single product id.
 * @return {Product | Product[]}
 */
exports.getProducts = async function (products) {
  console.log("getProducts", products)
  // if single product id is give
  if (typeof products === 'string') {
    return (await _createGetProductRequest(products))[0]
  } else {
    let promises = products.map(id => _createGetProductRequest(id))
    return (await Promise.all(promises)).map(a => a[0])
  }
}

/**
 * Create request to retrieve [Product] by its `product_id`
 * @template Data
 * @param {string} id
 * @return {Promise<Data[]>}
 * @private
 */
function _createGetProductRequest(id) {
  console.log("_createGetProductRequest", id)
  return getData({
    path: "products",
    andQueries: [
      ["product_id", "==", id]
    ]
  })
}
