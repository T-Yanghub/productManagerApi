let mongoose = require('mongoose');
let config = require('./config');
mongoose.connect(`mongodb://localhost/${config.db}`);
let db = mongoose.connection;
db.on("error",()=>{
    console.error("数据库连接失败");
});
db.once("open",()=>{
    console.log("连接成功");
});