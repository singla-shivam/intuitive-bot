const {getProducts} = require("../database/product");

exports.cartDisplay = async function (agent){
    console.log("cartDisplay Invoked");
    let product = await getProducts('kH0RqmabLTNfZ34u3Jcb')
    agent.add(JSON.stringify(product));
}
