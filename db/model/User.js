
const mongoose = require('mongoose')

let userSchame = new mongoose.Schema({
	user:{type:String,required:true},
	password:{type:String,required:true},
	age:{type:Number},
	sex:{type:Number,default:0}
})

let User = mongoose.model('user',userSchame)

module.exports = User