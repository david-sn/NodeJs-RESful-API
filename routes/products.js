const express = require('express');
const router = express.Router();

const Prod = require('../models/product');
const mongoose = require('mongoose');


router.get('/', (req, res) => {
    Prod.find()
        .select('_id name price')
        .exec()
        .then(docs => {
            res.status(200).json({
                message: " Get Request / produt",
                data: docs
            });
        }).catch(e => {
            res.status(200).json({
                message: " Get Request / produt",
                error: e
            });
        });
});


router.post('/', (req, res) => {
    const pDB = new Prod({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    pDB.save((err, result) => {
        console.log(result);
    });
    res.status(200).json({
        message: " POST Request / produt",
        createProduct: pDB
    });
});


router.get('/:id', (req, res) => {
    console.log(req.params.id);
    Prod.findById(req.params.id)
        .exec()
        .then((rs) => {
            res.status(200).json(rs);
        })
        .catch((e) => {
            res.status(500).json({ error: e });
        });
});



router.patch('/:id', (req, res) => {
    Prod.update({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            price: req.body.price
        }
    }).exec().then(rs => {
        res.status(200).json({
            message: `PATCH Request / produt id ${req.params.id}`,
            result: rs
        });
    }).catch(e => {
        res.status(200).json({
            message: `PATCH Request / produt id ${req.params.id}`,
            error: e
        });
    });
});



router.delete('/:id', (req, res) => {
    Prod.deleteOne({ _id: req.params.id }).exec()
        .then(rs => {
            console.log(rs);
            res.status(200).json({
                message: `Delete Request / produt id ${req.params.id}`,
                data: rs
            });
        }).catch(e => {
            console.log(e);
            res.status(500).json({
                message: `Delete Request / produt id ${req.params.id}`,
                error: e
            });
        });
});

module.exports = router