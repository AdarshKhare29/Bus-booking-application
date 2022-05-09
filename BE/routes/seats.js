const express = require('express');
const router = express.Router();
const BusModel = require('../model/Bus')

router
    .get('/reserve', async (req, res, next) => {
        let q = req.query.q
	// console.log(q)
        let busNumber = q
        let result = await BusModel
                     .findOne({ busNumber })
                     .select('reservation')
        res.json({result})             
    })
    .post('/reserve-seat', async (req, res, next) => {
        const seats = req.body.seats
        const busNumber=req.body.busNumber
        console.log(seats,busNumber)
        const result = await BusModel.updateOne({ busNumber }, {
            $push: { 'reservation.seats': seats }
        })
        res.json({ message: 'reserved', result })
    });

module.exports = router;