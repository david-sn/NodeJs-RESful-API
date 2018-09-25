const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


const app = express();


const productsRoutes = require('./routes/products');
const orderRoute = require('./routes/orders');

mongoose.connect('mongodb://localhost:27017/nodejs');


//loggiong
app.use(morgan('dev'));


//bodyParser must be before router to hoc on it
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//register CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (res.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUST, POST, GET, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productsRoutes);
app.use('/orders', orderRoute);


//HANDLE 404
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.satus = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.satus || 500);
    res.json({
        error: {
            message: error.message
        }
    });

    next();
});


app.listen(3001, () => {
    console.log('started-------');
});

module.exports = app;