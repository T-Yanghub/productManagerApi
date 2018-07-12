let sever = require('../server/user');
/*连接数据库*/
require('../DB');

/*测试注册*/
  async function testRegister() {
     let user={
         username:"花木兰",
         password:"123456"
     }
       let registerUser =  await sever.registerUser(user);
     console.log(registerUser);

 }

 /*测试查找*/
async function testFind() {
     let userInfo = await sever.getUserInfo('木兰');
     console.log(userInfo);

 }

/*测试删除*/
async function  testDelete() {
   await sever.deleeteUser("花木兰")
}

/*测试登录*/
async function testLogin() {
    let user={
        username:"花木兰",
        password:"123456"
    };
    let token = await sever.userLogin(user.username,user.password);
    console.log(token);

}

testLogin() ;