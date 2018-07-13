const expressErr = require('express-async-errors');
let express = require('express');
require('./DB');
let config = require('./config');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let userRouter = require('./router/user');
const categoryRouter = require('./router/category');
const productRouyer = require('./router/product');
const orderRouter = require('./router/order');

const app=express();

app.use(morgan('combined'));
// parse application/json
app.use(bodyParser.json());


/*引入自定义的中间件 给res安装两个方法来对请求响应*/
app.use(require('./middleware/res_middleWare'));

/*登录检测中间件*/
app.use(require('./middleware/token-ware'));

/*权限检测中间件*/
app.use(require('./middleware/permission-ware'));
/*用户相关的操作路由*/
app.use('/user',userRouter);

/*分类的路由*/
app.use('/category',categoryRouter);


/*商品相关的路由*/
app.use('/product',productRouyer);


/*订单路由*/
app.use('/order',orderRouter);


/*异常处理中间件*/
app.use((error,req,res,next)=>{
    res.fail(error.toString());

});

console.log(config.port);
console.log(config.db);
app.listen(config.port);