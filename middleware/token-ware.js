const crypto = require('lxj-crypto');
const config = require('../config');
const userSever= require('../server/user');


 function needLogin(url) {

    let notLoginUrls=[
        /.*\/user\/login/,

        /.*\/user\/register/

    ];
    let isExclude = false;
    notLoginUrls.forEach(item=>{
        if(item.test(url)){//正则匹配测试
            isExclude =true;
        }
    });

    return isExclude;


}


module.exports=async(req,res,next)=>{
/*判断当前请求是否需要登录*/
   if(!needLogin(req.url)){
   /*是需要登录的  在进一步看是否有token*/
   const token = req.get('token');//获取请求头里面的数据一般用get
   /*如果token为空提示需要登录*/
   if (!token){
       throw Error('请先登录');
   }
   /*拿到token后对token进行解码比较*/
       let tokenData="";
       try {
           console.log(token);
           tokenData = JSON.parse(crypto.aesDecrypt(token, config.TokenKey));
           console.log(tokenData);
       } catch (e) {
           /*解码异常说明token不合法*/
           throw Error("token不合法");
       }
   /*判断是否过期*/
   if(tokenData.expire<Date.now()){
       throw Error("token已过期，请重新登录");
   }
    /*从token中取出user的信息以便在以后的请求中用到*/
   const userInfo =  await userSever.getUserInfo(tokenData.username);
     /*把user的信息存放在req里面*/
     req.user=userInfo;

     console.log( "这是"+tokenData);

   }
        next();
};