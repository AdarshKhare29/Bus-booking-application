const express = require('express');

const router = express.Router({caseSensitive: false});
const BusModel = require('../model/Bus')


// router.get('/search', async (req, res, next) => {
//     let q = req.query.q
//     let [from, to] = q.split("-")
//     try {
//         const result = await BusModel.find({ 'from': from, 'to': to })
//         res.json({
//             result
//         })
//     } catch (err) {
//         next(err)
//     }
// });

// router.post('/addNewBus',(req, res) => {
//     const newBus = new Bus({ ...req.body })
//     newBus.save((err, bus) => {
//         if (err) {
//             throw err;
//         }
//         return res.json({ Error: "Bus added Successfully" })
//     })
// })


router.get('/search',async(req,res)=>{
    let q = req.query.q
	// console.log(q)
    let [from, to] = q.split("-")
    await BusModel.find({ 'from': from, 'to': to })
	.exec((err,data)=>{
		if(err) throw err;
		return res.json({data})
	})
})

module.exports = router;