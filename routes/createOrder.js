const express = require('express');
const bodyParser = require('body-parser');
const Order = require('../models/order');
const router = express.Router();

router.use(bodyParser());

router.post('/orders', async (req, res) => {
    try {
        const order = await Order.create({
            user: req.user,
            status: req.body.status,
            products: req.body.products,
            totalPrice: req.body.totalPrice,
            totalQuantity: req.body.totalQuantity
        })
        console.log(order.products);
        return res.status(200).json({
            status: "New Order Created",
            order: order
        })
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router