const yaml = require('js-yaml')
const fs = require('fs')
const {firestore} = require('firebase-admin')

async function addData() {
  /** @type Product[] */
  const products = yaml.safeLoad(fs.readFileSync(`${__dirname}/lowesData.yaml`, 'utf8'))

  const batch  = firestore().batch()
  // products.forEach(product => {
  //   const doc = firestore().collection("products").doc()
  //   product.product_id = doc.id
  //   batch.set(doc, product)
  // })
  const doc = firestore().collection("products").doc()
  products[0].product_id = doc.id
  batch.set(doc, products[0])
  await batch.commit()
}

module.exports = {addData}
