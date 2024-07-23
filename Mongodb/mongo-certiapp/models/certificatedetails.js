const {Schema,model} = require('mongoose');
const demo = new Schema({
    course:{type:String, required:true},
    cid:{type:String, required:true},
    name:{type:String, required:true},
    grade:{type:String, required:true},
    date:{type:String, required:true},
})
const Cdetails = model('certificatedetails', demo);
module.exports = Cdetails;