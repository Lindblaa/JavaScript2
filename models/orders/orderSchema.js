const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    user:       { type: mongoose.Schema.Types.ObjectId, ref:'user', required: true },
    cart:       { type: Object, required: true },
    total:      { type: Number, required: true },
    quantity:   { type: Number, required: true }

}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)