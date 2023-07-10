const mongoose = require('mongoose')
const { UserModel } = require('../models/user.model');
const { RestaurantModel } = require('../models/restaurant.model');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: RestaurantModel
    },
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    status: String // e.g, "placed", "preparing", "on the way", "delivered"
})

const OrderModel = mongoose.model('order', orderSchema)

module.exports = { OrderModel }

