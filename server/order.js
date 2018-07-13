const Order = require('../model/order');
const Product = require('../model/product');
let productSever = require('../server/product');
//const productSever = require("../server/product");
const config = require('../config');
let Big = require('big.js');





/*order: {productId: 'cccc', count: 2}  需要客户端传过来的数据就仅仅 商品名  和数量  其他的到数据库查找
* 添加订单
* */
async function addOrder(order) {
    /*先判断是否存在此商品*/
    const p = await  Product.findOne({_id:order.productId});
    if(!p){
        throw Error('订单中的商品不存在');
    }
/* 判断库存是否足够*/

if(p.stock<order.count){
throw Error('商品库存不够');
}
/*对订单填充 */
    order.productName = p.name;

    order.productPrice = p.price;

    order.totalPrice = Big(order.productPrice).times(order.count)//订单价格

    let o = await Order.create(order);

    /*减库存*/
    await productSever.updateProduct(p._id, {stock: p.stock-order.count});

    return o


}

/*
* 分页获取订单信息
* */
async function findOrderByPage(page=1) {

    const orders = await Order.find().skip( (page-1)*config.PageCount ).limit(config.PageCount)

        .sort("created");

    return orders;


}

module.exports={
    addOrder,
    findOrderByPage
}