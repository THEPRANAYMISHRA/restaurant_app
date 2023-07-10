const { RestaurantModel } = require('../models/restaurant.model');

let listOfRestaurants = async (req, res) => {
    let restaurants = await RestaurantModel.find()
    return res.status(200).send(restaurants);
}

let OneRestaurant = async (req, res) => {
    const _id = req.params.id
    let restaurant = await RestaurantModel.findOne({ _id })
    return res.status(200).send(restaurant);
}

let OneRestaurantMenu = async (req, res) => {
    const _id = req.params.id
    let restaurant = await RestaurantModel.findOne({ _id })
    return res.status(200).send(restaurant.menu);
}

let addItemInMenu = async (req, res) => {
    const _id = req.params.id
    let { name, description, price, image } = req.body;

    let data = await RestaurantModel.findById({ _id })

    if (data) {
        try {
            let newMenu = data.menu;
            newMenu.push({ name, description, price, image })
            await RestaurantModel.findByIdAndUpdate(_id, { menu: newMenu })
            return res.status(200).send({ "msg": "menu updated successful!" });
        } catch (error) {
            console.log(error)
            return res.status(400).send({ "msg": "Error!Could not update menu!" })
        }
    } else {
        return res.status(400).send({ "msg": "No restaurant found by this id" })
    }
}

let deleteMenu = async (req, res) => {
    const restaurantId = req.params.id
    const menuId = req.params.menuId

    //find the resturant with given ID and remove item from its meny using filter method
    let data = await RestaurantModel.findById({ _id: restaurantId })

    if (data) {
        try {
            let newMenu = data.menu;
            let updatedMenu = newMenu.filter((ele) => {
                if (ele._id == menuId) {
                    return false
                } else {
                    return true
                }
            })
            let _id = restaurantId

            await RestaurantModel.findByIdAndUpdate(_id, { menu: updatedMenu })
            return res.status(200).send({ "msg": "menu updated successful!" });
        } catch (error) {
            console.log(error)
            return res.status(400).send({ "msg": "Error!Could not update menu!" })
        }
    } else {
        return res.status(400).send({ "msg": "No restaurant found by this id" })
    }
}

module.exports = { listOfRestaurants, OneRestaurant, OneRestaurantMenu, addItemInMenu, deleteMenu }