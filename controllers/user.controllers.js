const { UserModel } = require('../models/user.model')
const bcrypt = require('bcrypt');
let saltRounds = 10

const register = async (req, res) => {
    let { name, email, password, address } = req.body

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: email })

    if (existingUser) {
        res.status(201).send({ "msg": "User is already existing!" })
    } else {
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                return res.status(400).send('registration failed!')
            } else {
                let newUser = await UserModel({ name, email, password: hash, address })
                await newUser.save()
                return res.status(201).send({ "msg": "registration successful!" })
            }
        });
    }
}

const login = async (req, res) => {
    let { email, password } = req.body;

    const isUser = await UserModel.findOne({ email: email })

    if (isUser) {
        bcrypt.compare(password, isUser.password, function (err, result) {
            if (result) {
                return res.status(201).send({ msg: "login successful" })
            } else {
                return res.status(404).send({ msg: "wrong credentials!" })
            }
        });
    } else {
        res.status(400).send({ "msg": 'No such user!' })
    }
}

const resetPassword = async (req, res) => {
    let _id = req.params.id

    let { currPassword, newPassword } = req.body;

    try {
        const User = await UserModel.findOne({ _id })

        bcrypt.compare(currPassword, User.password, function (err, result) {
            if (err) {
                return res.status(404).send({ msg: "Current password is wrong!" })
            } else {
                bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
                    if (err) {
                        return res.status(400).send('Updation failed!')
                    } else {
                        await UserModel.findByIdAndUpdate(_id, { password: hash })
                        return res.status(201).send({ "msg": "Password updated successfully!" })
                    }
                });
            }
        });
    } catch (error) {
        console.log(error)
        res.status(404).send({ "msg": "User not found!" })
    }
}

module.exports = { register, login, resetPassword }