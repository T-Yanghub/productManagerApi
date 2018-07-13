const mongoose = require('mongoose');
let schema = mongoose.Schema({
    name: {
        type: String,
        unique:true,
        required: [true, '商品名不能为空']

    },
    price: {
        type: String,
        required: [true, '价格不能为空'],

    },
    /*库存*/
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, '分类id不能为空']
    },
    description: {
        type: String
    },
    isOnSale: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now()
    }


},{versionKey:false});

module.exports=mongoose.model("product",schema);