const { OrderModel } = require('../models/order.model')

const placeOrder = async (req, res) => {
    try {
        let order = await OrderModel(req.body)
        await order.save()
        return res.status(201).send({ "msg": "order placed!" })
    } catch (error) {
        return res.status(400).send({ "msg": "couldn't place your order!" })
    }
}

const orderDetails = async (req, res) => {
    let _id = req.params.id
    try {
        let order = await OrderModel.findById(_id)
        return res.status(201).send({ "order": order })
    } catch (error) {
        return res.status(400).send({ "msg": "No such order!" })
    }
}

const updateOrderStatus = async (req, res) => {
    let _id = req.params.id

    let { status } = req.body
    try {
        let order = await OrderModel.findByIdAndUpdate(_id, { status: status })
        return res.status(201).send({ "msg": "status updated!" })
    } catch (error) {
        return res.status(400).send({ "msg": "failed to update status!" })
    }
}

module.exports = { placeOrder, orderDetails, updateOrderStatus }
