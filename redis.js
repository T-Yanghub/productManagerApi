const redis = require('redis');
require('./DB');
const client = redis.createClient('redis://127.0.0.1:6379');
const util = require('util');
const config = require("./config")
const Product = require('./model/product.js');
const lrangeAsnc = util.promisify(client.lrange).bind(client);
const llenAsnc = util.promisify(client.llen).bind(client);



client.on('error',(err)=>{
    console.log(err.toString());
});

/*将商品从数据库中取出存放在redis里面*/
let key = "product"
async function hotProduct() {

    console.log('haha');
    const products = await Product.find({});
    console.log(products);
    console.log('haha');
/*因为集合里面是product对象 所以我们需要遍历集合把js对象变成JSON字符串在添加到集合*/

products.forEach(p=>{
    client.rpush(key,JSON.stringify(p));
});

}
/*分页查询*/
async function getProductsFromRedisByPage(page=1) {
    //获取集合的长度
    const len = await llenAsnc(key);
    /*如果集合不为空就从集合里面分页查*/
    if(len>0){
        let skip=config.PageCount*(page-1);

        let stop= config.PageCount*page-1;
           const list = await lrangeAsnc(key,skip,stop);
        console.log(list);
           return list;

    }else{
      return  await  Product.find().skip(config.PageCount*(page-1)).limit(config.PageCount).sort("created");
    }
}

getProductsFromRedisByPage(2);