const router = require('express').Router();
const productSever = require('../server/product');




/*
* 添加
* */
router.post('/',async(req,res)=>{

    const product = await productSever.addProduct(req.body);
    res.success(product);

});

/*
* 查找
* */

router.get('/',async(req,res)=>{
     const products = await productSever.findProductByPage(req.query.page);
           console.log(req.query.page);
     res.success(products);

});

/*
* 更新
* */
router.put('/:id',async(req,res)=>{
    await productSever.updateProduct(req.params.id,req.body);

    res.success();
});

/*
* 删除
* */
router.delete('/:id',async(req,res)=>{
    await productSever.deleteProduct(req.params.id);

    res.success();
})
module.exports=router;