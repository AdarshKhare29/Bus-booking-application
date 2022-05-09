const express = require('express');

const router = express.Router();
const UserModel = require('../model/User')

router.get('/', async (req, res, next) => {
    console.log("here")
    try {
        const user = await UserModel.findOne({ email: req.user.email })
        res.json({
            message: 'You made it to the secure route',
            user,
        })
    } catch (err) {
        next(err)
    }
});

module.exports = router;