let mongoose = require('mongoose');
let schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, '分类不能没有名称'],
        unique: true
    },
    created: {
        type:Date,
        default:Date.now()
    }
},{versionKey:false});
module.exports=mongoose.model('category',schema);