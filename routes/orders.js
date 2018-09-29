const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/orders');
const Prod = require('../models/product');




router.get('/', (req, res) => {
    Order.find().exec().then(rs => {
        res.status(200).json({
            message: " Get Request / order",
            data: rs
        });
    }).catch();

});



router.post('/', (req, res) => {

    Prod.findById(req.body.productId).then(rs => {
        if (!rs) {
            return orderDB.save((err, rs) => {
                res.status(201).json({
                    message: "Product not found"
                });
            });
        }
        const orderDB = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            productId: req.body.productId
        });
        return orderDB.save((err, rs) => {
            res.status(201).json({
                message: " POST Request / order",
                order: rs
            });
        });
    }).catch(e => {

        res.status(201).json({
            message: "Product not found",
            error: e
        });
    });

});



router.get('/:id', (req, res) => {
    Order.findById(req.params.id).exec().then(r => {
        res.status(200).json({
            message: ` POST Request / order id ${req.params.id}`,
            data: r
        });
    }).catch(e => {
        res.status(500).json({
            message: ` POST Request / order id ${req.params.id}`,
            error: e
        });
    });


});


router.delete('/:id', (req, res) => {
    Order.deleteOne({ _id: req.params.id }).exec().then(d => {
        res.status(200).json({
            message: ` delete Request / order id ${req.params.id}`,
            result: d
        });
    }).catch(e => {
        res.status(200).json({
            message: ` delete Request / order id ${req.params.id}`,
            result: e
        });
    });

});


module.exports = router