const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).json({
        message: " Get Request / produt"
    });
});


router.post('/', (req, res) => {
    console.log(req.body);
    const produt = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(200).json({
        message: " POST Request / produt",
        createProduct: produt
    });
});


router.get('/:id', (req, res) => {
    res.status(200).json({
        message: `GET Request / produt id ${req.params.id}`
    });
});



router.patch('/:id', (req, res) => {
    res.status(200).json({
        message: `PATCH Request / produt id ${req.params.id}`
    });
});



router.delete('/:id', (req, res) => {
    res.status(200).json({
        message: `Delete Request / produt id ${req.params.id}`
    });
});

module.exports = router