const express = require('express');
const app = express();
const cors = require('cors');

const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const orderController = require('./controllers/orderController');


//MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//CONTROLLERS
app.use('/api/products', productController);
app.use('/api/users', userController);
app.use('/api/orders', orderController);



module.exports = app