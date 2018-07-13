const Category = require('../model/category');
const config = require('../config');



/*创建一个商品分类*/
async function createCategory(category) {
    const c = await Category.findOne({name:category.name});
    if (c){
        throw Error(`商品名为  ${category.name }  的商品已经存在`);
    }


   const res = await Category.create(category);
   return res;


}
/*判断id是否存在*/

async function isIdExist(id) {
    const res = await Category.findOne({_id:id});
    if(!res){
        throw Error(`id为  ${id} 的分类不存在`);
    }
}


/*更新分类
* update: {name: "家电"}
* */
async function updateCategory(id,update) {

    //判断id是否存在
       await isIdExist(id);


       const res = await Category.updateOne({_id:id},update);
    // res: {n: 1, nModify:1 , ok:1}
       if(res.n<1){
           throw Error('更新失败');
       }

       return res;
}


/*删除分类*/

async function deleteCategory(id) {
    //判断id是否存在
    await isIdExist(id);
    const res = await Category.deleteOne({_id:id});
    // res: {n: 1, nModify:1 , ok:1}
    if(res.n<1){
        throw Error('更新失败');
    }

    return res;

}


/*查找分类  分页
* 分页默认为1
* */

async function findCategoryByPage(page=1) {

    if (page<1){
        throw Error('page不能为小数或小于1的数');
    }
    const categorys = await Category.find().skip(config.PageCount*(page-1)).limit(config.PageCount).sort('created');

    return categorys;

}

module.exports={
    createCategory,
    updateCategory,
    deleteCategory,
    findCategoryByPage

}