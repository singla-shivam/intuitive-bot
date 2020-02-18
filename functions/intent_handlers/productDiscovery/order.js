const { getData } = require('../../database/api');
const { findProductsByTags, addProduct } = require('../../database/product')

exports.order = async function (agent) {
  console.log('INSIDE ORDER')
  // products = await getData({ path: 'products' });
  // console.log(products);
  const { tag } = agent.parameters;
  const products = await findProductsByTags(tag);
  console.log(products)
  let response = products.length > 1 ? "Sorry, can you be more specific" : "Thank You for the order";
  if (products.length == 1) {
    addProduct(tag[0], tag[1], "200", tag);
  }
  agent.add(response)

}

