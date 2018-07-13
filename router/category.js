const router = require('express').Router();
const categoryServer = require('../server/category');

/*
*查找
* */
router.get('/',async(req,res)=>{
    const promises =await categoryServer.findCategoryByPage(req.query.page);

    res.success(promises);
});

/*
* 添加
* */
router.post('/',async(req,res)=>{
    const categorys =await categoryServer.createCategory(req.body);

    res.success(categorys);
})
/*
* 更新
* */
router.put('/:id',async(req,res)=>{
  await categoryServer.updateCategory(req.params.id,req.body);
   res.success();
});

/*
删除
* */

router.delete('/:id',async(req,res)=>{
    categoryServer.deleteCategory(req.params.id);
    res.success();

});

module.exports=router;
