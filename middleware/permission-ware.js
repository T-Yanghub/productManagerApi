/*把角色和其对应的权限一对象形式映射*/

let role_permission = [
    {
        role: 0 ,//表示普通商家
        permission: [//表示其可访问的接口的一个数组
    /.*\/product/,

    /.*\/order/,

    /.*\/category/

]

},
    {
        role:100,//表示超级管理员
        permission:[
            /.*/
        ]
    }
];

module.exports=(req,res,next)=>{
    if (req.user){
        /*对role_permission数组循环遍历 比较其的role 和其当前请求的路径是否在其权限内*/
          let isgo=false;

          role_permission.forEach(u=>{
              if (u.role===req.user.role){
                  //正则匹配测试
                  u.permission.forEach(isgoUrl=>{
                      if(isgoUrl.test(req.url)){
                          isgo=true;
                      }
                  });
              }
          });
        if (!isgo){
            throw Error("抱歉你的权限不够");
        }
    }
   next();

}