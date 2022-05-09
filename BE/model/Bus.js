const mongoose = require('mongoose')

// const reservationSchema=new mongoose.Schema({ 
//     seats:{ type: Array},
//     isFull: { type:Boolean}
// })

const BusSchema = new mongoose.Schema({
    busNumber: { type: String, required: true, trim: true, maxlength: 20 },
    busType: { type: String, required: true, trim: true},
    totalSeats: { type:Number, required:true},
    from: { type: String, required: true },
    to: { type: String, required: true },
    dep: { type: String, required: true },
    arr: { type: String, required: true },
    fare: { type: Number, required: true },
    
    AvailableSeats :{ type: Array, default: [1, 2, 3, 4, 5, 6, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28] },
    // BookedSeats: { type: Array, default: [7, 8, 9, 10, 11] },
    TravelDate: { type:String},
    reservation:{
        seats:{ type: Array,default: [1, 3, 8, 10]},
    isFull: { type:Boolean}
    }
}, { timestamps: true })




const Bus = mongoose.model("Bus", BusSchema)

module.exports = Bus;