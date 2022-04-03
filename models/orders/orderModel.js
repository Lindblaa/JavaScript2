const Order = require('./orderSchema')


exports.saveOrder = (req, res) => {
    console.log(req)
    Order.create({
        cart: req.body.cart,
        user: req.userData.id,
        total: req.body.total,
        quantity: req.body.quantity
    })
    .then(data => {
        res.status(201).json({
            statusCode: 201,
            status: true,
            message: 'Your order is saved!',
            data
        })
    })
    .catch(err => {
        res.status(401).json(err)
    })

}

exports.findOrders = (req, res) => {

    Order.find({ user: req.userData.id}, (err, result) => {
      
      if(err) {
        return res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Something went wrong',
          err
        })
      }
  
      if(!result) {
        return res.status(404).json({
          statusCode: 404,
          status: false,
          message: 'You have not saved any orders',
          err
        })
      }
  
      res.status(200).json(result)
    })
    
  }

  //Hitta specifik order
  exports.getOrderById = (req, res) => {

    Order.exists({ _id: req.params.id }, (err, order) => {
  
      if(err) {
        return res.status(400).json({
          statusCode: 400,
          status: false,
          message: 'You made a bad request',
        })
      }
  
      if(!order) {
        return res.status(404).json({
          statusCode: 404,
          status: false,
          message: 'This order does not exist',
        })
      }
  
  
      Order.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => {
          res.status(500).json({
            statusCode: 500,
            status: false,
            message: err.message || 'Server error',
          })
        })
  
    })
  
  }