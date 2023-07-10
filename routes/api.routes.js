const express = require('express')
const myrouter = express.Router()
const { register, login, resetPassword } = require('../controllers/user.controllers');
const { listOfRestaurants, OneRestaurant, OneRestaurantMenu, addItemInMenu, deleteMenu } = require('../controllers/restaurant.controllers');
const { placeOrder, orderDetails, updateOrderStatus } = require('../controllers/order.controllers');

myrouter.post('/register', register)

myrouter.post('/login', login)

myrouter.patch('/user/:id/reset', resetPassword)

myrouter.get('/restaurants', listOfRestaurants)

myrouter.get('/restaurants/:id', OneRestaurant)

myrouter.get('/restaurants/:id/menu', OneRestaurantMenu)

myrouter.post('/restaurants/:id/menu', addItemInMenu)

myrouter.delete('/restaurants/:id/menu/:menuId', deleteMenu)

myrouter.post('/orders', placeOrder)

myrouter.get('/orders/:id', orderDetails)

myrouter.patch('/orders/:id', updateOrderStatus)


module.exports = { myrouter }



// {
//     "name": "Mohan",
//     "email": "mg@mail.com",
//     "password": "1234568",
//     "address": {
//         "street": "String",
//         "city": "String",
//         "state": "String",
//         "country":"India",
//         "zip":434343
//     }
// }

// {
//     "currPassword": "12345678",
//     "newPassword": "natunatu"
// }