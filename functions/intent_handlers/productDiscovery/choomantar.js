const {setCartItem} = require("./database/cart");

exports.choomantar = async function (agent){
    let sessionId = agent.request_.body.sessionId
    console.log("choomantar Invoked");
    setCartItem(sessionId, 'qZFFAVPfMChskcRwxpQZ', 3)
    agent.add("Amul milk 3 packets are now in your cart")
}
