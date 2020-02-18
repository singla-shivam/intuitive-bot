const {getData, addData} = require('./api')

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
 *
 * @param {string} brand
 * @param {string} name
 * @param {number} price
 * @param {string[]} tags
 * @return {Promise<T>}
 */
exports.addProduct = async function (brand, name, price, tags) {
  tags = tags.concat(name.split(' ').map(a => a.toLowerCase()))
    .concat(brand.split(' ').map(a => a.toLowerCase()))

  const tagsSet = new Set(tags)
  console.log(tags)
  console.log(tagsSet)
  const tagsMap = {}
  tagsSet.forEach(tag => tagsMap[tag] = true)

  const product = {
    brand,
    name,
    price,
    tags: tagsMap
  }
  return await addData(
    {
      path: "products",
      value: product
    },
    "product_id"
  )
}

/**
 *
 * @param {string[]} tags
 * @param {string[]} [productIds]
 * @returns {Promise<Product[]>}
 */
exports.findProductsByTags = async function (tags, productIds) {
  /** @type AndQuery[]*/
  const andQueries = tags.map(tag => [`tags.${tag}`, "==", true])

  if (productIds) {
    // get and queries correspond to productIds
    /** @type AndQuery[][]*/
    const productsAndQueries = productIds.map(id => [...andQueries, ["product_id", "==", id]])
    // get product matching with each productIds and tags
    /** @type ?Promise<Product[]>[]*/
    const promises = productsAndQueries.map(andQueries => _createTagQuery(andQueries))
    return (await Promise.all(promises)).map(p => p[0])
  } else return await _createTagQuery(andQueries)
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

/**
 *
 * @param {AndQuery[]} andQueries
 * @returns Promise<Product[]>
 * @private
 */
function _createTagQuery(andQueries) {
  return getData({
    path: "products",
    andQueries: andQueries
  })
}
