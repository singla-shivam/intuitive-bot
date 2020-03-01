const {getData, addData} = require('./api')

/**
 * @typedef Product
 * @type object
 * @property {string} product_id
 * @property {string} name
 * @property {string} brand
 * @property {string} imageUrl
 * @property {string} link
 * @property {number} price
 * @property {object} tags
 * // tv attributes
 * @property {number} [mrp]
 * @property {number} [display_size]
 * @property {number} [waranty]
 * @property {string} [screen_type]
 * @property {string} [resolution]
 * @property {boolean} [smart_tv]
 */

/**
 *
 * @param {string | string[]} products - Array of product ids of products to fetched. Can be single product id.
 * @return {Product | Product[]} - returns product or array of products according to `products`
 * if the requested product(s) is not found returns null if single id was provided
 * or empty array if multiple ids were provided
 */
exports.getProducts = async function (products) {
  // if single product id is give
  console.log("getProducts", products)
  if (typeof products === 'string') {
    let p = await _createGetProductRequest(products)
    return p.length === 0 ? null : p[0]
  } else if (typeof products === 'object' && products.length === 0) return [] //@author satyamcse
  else {
    // if less than 10 product ids are provided because in op works with max 10 objects
    if(products.length <= 10) {
      const res = await _createGetProductRequest(products, 'in')
      console.log('getProducts', res)
      return res
    }
    else {
      /** @type Promise<Product[]>[] */
      let promises = []
      let i = 0;
      while (i < products.length) {
        promises.push(_createGetProductRequest(products.slice(i, i + 10), 'in'))
        i += 10
      }
      let result = await Promise.all(promises)
      let productsDetails = []
      result.forEach(a => {
        productsDetails = productsDetails.concat(a)
      })
      return productsDetails
    }
  }
}

/**
 * Function to get categories that cover all the products
 * @param {String[]} products: Is set from which categories is to be picked, if absent all products
 * @return {Promise<string[]>}
 * @author satyamcse
 */
exports.getProductCategories = async function (products) {
  return [`TV`, `AC`, `Refrigerator`]
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
  if (tags.length === 0 || (productIds && productIds.length === 0)) return []
  /** @type AndQuery[]*/
  const andQueries = tags.map(tag => [`tags.${tag}`, "==", true])

  if (productIds) {
    // get and queries correspond to productIds
    /** @type AndQuery[][]*/
    const productsAndQueries = productIds.map(id => [...andQueries, ["product_id", "==", id]])
    // get product matching with each productIds and tags
    /** @type ?Promise<Product[]>[]*/
    const promises = productsAndQueries.map(andQueries => _createProductQuery(andQueries))
    return (await Promise.all(promises)).filter(p => p[0]).map(p => p[0])
  } else return await _createProductQuery(andQueries)
}

/**
 *
 * @param {string} property
 * @param {string | number} upperLimit
 * @param {string | number} lowerLimit
 * @return {Promise<Product[]>}
 */
exports.findProductsByRange = async function (property, upperLimit, lowerLimit) {
  /** @type AndQuery[]*/
  const andQueries =  [
    [property, '>=', lowerLimit],
    [property, '<=', upperLimit]
  ]
  return await _createProductQuery(andQueries)
}

/**
 * NOTE - won't work due to indexes in database
 * @param {string[]} tags
 * @param {string} property
 * @param {string | number} upperLimit
 * @param {string | number} lowerLimit
 * @return {Promise<Product[]>}
 *
 */
exports.findProductsByTagsRange = async function (tags, property, upperLimit, lowerLimit) {
  if(tags.length === 0) return []
  /** @type AndQuery[]*/
  const andQueries = tags.map(tag => [`tags.${tag}`, "==", true])
  andQueries.push(
    [property, '>=', lowerLimit],
    [property, '<=', upperLimit]
  )
  return await _createProductQuery(andQueries)
}

/**
 * Create request to retrieve [Product] by its `product_id`
 * @template Data
 * @param {string | string[]} ids
 * @param {string} [operator='==']
 * @return {Promise<Data[]>}
 * @private
 */
function _createGetProductRequest(ids, operator = '==') {
  return getData({
    path: "products",
    andQueries: [
      ["product_id", operator, ids]
    ]
  })
}

/**
 *
 * @param {AndQuery[]} andQueries
 * @returns Promise<Product[]>
 * @private
 */
function _createProductQuery(andQueries) {
  return getData({
    path: "products",
    andQueries: andQueries
  })
}
