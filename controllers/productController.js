const router = require('express').Router();
const productModel = require('../models/products/productModel')

//Get all proucts
router.get('/', productModel.getProducts)

// //Get one product
router.get('/:id', productModel.getProductById)

// //Create new product
router.post('/', productModel.createProduct)

// //Update product
router.patch('/:id', productModel.updateProduct)

// //Delete prouct
router.delete('/:id', productModel.deleteProduct)



module.exports = router;