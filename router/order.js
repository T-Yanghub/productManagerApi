const router = require('express').Router();
const orderSever = require('../server/order');


/*
* 添加订单
* */

router.post('/',async(req,res)=>{
     const orders = await orderSever.addOrder(req.body);
     res.success(orders);
});

/*
* 查找
* */

router.get("/",async(req,res)=>{
   const orders = await orderSever.findOrderByPage(req.query.page);
   res.success(orders);

});

module.exports=router