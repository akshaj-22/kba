const { Schema } = require('mongoose')
const { model } = require('mongoose')
const demo = new Schema({
    task: { type: String, required: true }
   
})

const todo  = model('todo', demo) 
module.exports = todo    