const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productType : {String},
    quantity : {Number,default : 0},
    washing : {Boolean,default: false },
    ironing : {Boolean,default: false},
    drywash: {Boolean,default: false},
    chemicalwash : {Boolean,default: false}
})


const orderSchema = new mongoose.Schema({
    status : {String},
    products : {type : [productSchema]},
    totalPrice : {Number,default: 0},
    totalQuantity : {Number,default: 0},
    user : {type: mongoose.Types.ObjectId, ref: 'user' }
})

const Order = mongoose.model("Order",orderSchema)

module.exports = Order;