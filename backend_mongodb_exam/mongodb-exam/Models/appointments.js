const { Schema } = require('mongoose')
const { model } = require('mongoose')
const demo = new Schema({
    reservationId: { type: Number, required: true },
    customerName: { type: String, required: true },
    tableNumber: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true }
   
})

const appointments  = model('appointments', demo) 
module.exports = appointments    