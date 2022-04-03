const router = require('express').Router();
const orderModel = require('../models/orders/orderModel')
const auth = require('../authentication/auth')

//Spara order
router.post('/', auth.verifyToken, orderModel.saveOrder)

//Hämta ordrar
router.get('/', auth.verifyToken, orderModel.findOrders)

//Hämta specifik order
router.get('/:id', orderModel.getOrderById)

module.exports = router