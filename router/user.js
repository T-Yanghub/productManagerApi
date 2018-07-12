let express = require('express');
let userSever = require('../server/user');
let router = express.Router();

/*注册*/
router.post('/register',async(req,res)=>{
     let user = await userSever.registerUser(req.body);
     res.success(user);
});


/*登录*/

router.post('/login',async(req,res)=>{
    let token = await userSever.userLogin(req.body.username,req.body.password);
    res.success({
        token:token
    });
});

/*查找*/

router.get('/:username', async (req,res)=>{
    let user = await userSever.getUserInfo(req.params.username);
    res.success(user);
});

/*删除*/

router.delete('/:username',async(req,res)=>{
    await userSever.deleteUser(req.params.username);
    res.success();
});
module.exports=router;