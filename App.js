const expressErr = require('express-async-errors');
let express = require('express');
require('./DB');
let config = require('./config');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let userRouter = require('./router/user');
const app=express();

app.use(morgan('combined'));
// parse application/json
app.use(bodyParser.json());


/*引入自定义的中间件 给res安装两个方法来对请求响应*/
app.use(require('./middleware/res_middleWare'));
/*用户相关的操作路由*/
app.use('/user',userRouter);
/*异常处理中间件*/
app.use((error,req,res,next)=>{
    res.fail(error.toString());

});

console.log(config.port);
console.log(config.db);
app.listen(config.port);