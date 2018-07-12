let User = require("../model/use");
let crypto = require('lxj-crypto');
let config = require('../config');


/*注册*/
async function registerUser(user) {
    let userf = await  User.findOne({username: user.username});
    if (userf) {
        throw Error("用户名已经存在");
    };

    user.password = crypto.sha1Hmac(user.password, user.username);
    user.role = 0;
    let res = User.create(user);
    res.password = "";

    return res;
}

/*登录*/
async function userLogin(username, password) {
    password = crypto.sha1Hmac(password, username);
    let user = await  User.findOne({username: username, password: password});
    if (!user) {
        throw Error("用户名和密码不匹配");
    } else {
let tokenData={
    username:username,
    expire:Date.now()+config.TokenExpire
};

let token=crypto.aesEncrypt(JSON.stringify(tokenData),config.TokenKey);
return token;

    }
}


/*获取用户信息*/
async function getUserInfo(username) {
    await username_exist(username);

    let res = await  User.findOne({username: username});
    // console.log(res);
    return res;

};


/*删除用户(根据用户名来删除)*/
async function deleteUser(username) {
    await username_exist(username);
    let res = await User.deleteOne({username: username});
    if (res.n < 1) {
        throw Error("删除失败");
    };


};

/*判断用户名是否存在*/

async function username_exist(username) {
    let res = await  User.findOne({username: username});
    if (!res) {
        throw  Error(`用户名为${username}的用户不存在`);
    };


};
module.exports = {
    registerUser,
    deleteUser,
    getUserInfo,
    userLogin
};