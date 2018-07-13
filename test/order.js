const orderSever = require('../server/order');

require("../DB");



/*
* 测试添加
* */

async function testAdd() {
    let order = {
        productId:'5b473ee06de209643053c6e6',
        count:7
    }

    const o= await orderSever.addOrder(order);
    console.log(o)
}

/*
* 测试查找
* */
async function testfind() {
    let page = 1

    const orders = await orderSever.findOrderByPage(page)
    console.log(orders);

}


testfind();