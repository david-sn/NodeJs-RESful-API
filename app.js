const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const app = express();




const productsRoutes = require('./routes/products');
const orderRoute = require('./routes/orders');
app.use('/products', productsRoutes);
app.use('/orders', orderRoute);

//loggiong
app.use(morgan('dev'));


//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



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