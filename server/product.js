const Product = require('../model/product');
const config = require('../config');





/*
* 添加
* */
async function addProduct(product) {
   const p = await Product.findOne({name:product.name});
   if (p){
       throw Error(`商品名为 ${product.name}  的商品已经存在`)
   }

    const res = await Product.create(product);
    return res;
}

/*
* 查找
* */
async function findProductByPage(page=1) {
    if (page<1){
        throw Error('页码不能为小于1')
    }
    const products = await Product.find().skip(config.PageCount*(page-1)).limit(config.PageCount).sort("greated");
    return products
}


/*update {name: "", price:""}
* 更新
* */
async function updateProduct(id,update) {
    await isIdExist(id);
    const res = await Product.updateOne({_id:id},update);
    if (res.n<1){
        throw Error('更新失败');
    }

    return res
}
/*
* 删除
* */
async function deleteProduct(id) {
    await isIdExist(id);
    const res = await Product.deleteOne({_id:id});
    if(res.n<1){
        throw Error('删除失败');
    }

}
/*
* 判断 id 是否存在
* */
async function isIdExist(id) {
    const p = await Product.findOne({_id:id});
    if(!p){
        throw Error(`id 为  ${id} 的商品不存在`);
    }
}
module.exports={
    addProduct,
    findProductByPage,
    updateProduct,
    deleteProduct
}
