const mongoose = require('mongoose');


const orderSchecma = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: String
    },
    quantity: Number
});


module.exports = mongoose.model('order', orderSchecma);