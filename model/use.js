let mongoose = require('mongoose');
let schema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "用户名不能缺少"],
        unique: [true, '用户名不能重复']
    },
    password: {
        type: String,
        required: [true, "密码不能缺少"]
    },
    age: {
        type: Number,
        min: [5, '年龄不能小于5'],
        max:[100,'年龄不能大于100'],
        default:20
    },
   role:{
        type: Number,
       default:0
   },//角色  用于权限校验  //0表示普通用户   100表示管理员
   great_time:{
        type:Date,
       default:Date.now()

   }
} ,{versionKey:false});
module.exports=mongoose.model('user',schema);