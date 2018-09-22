const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.status(200).json({
        message: " Get Request / order"
    });
});



router.post('/', (req, res) => {
    const order = {
        productId:req.body.productId, 
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: " POST Request / order",
        order:order
    });
});



router.get('/:id', (req, res) => {
    res.status(200).json({
        message: ` POST Request / order id ${id}`
    });
});




router.delete('/:id', (req, res) => {
    res.status(200).json({
        message: ` delete Request / order id ${id}`
    });
});


module.exports = router