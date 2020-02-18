const { getData } = require('../../database/api');
exports.order = async function (agent) {
  products = await getData({ path: 'products' });
  
}