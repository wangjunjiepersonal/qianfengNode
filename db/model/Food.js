
const mongoose = require('mongoose')

let foodSchame = new mongoose.Schema({
	name:{type:String,required:true},
	price:{type:String,required:true},
	desc:{type:String,required:true},
	typename:{type:String,required:true},
	typeid:{type:Number,required:true},
	img:{type:String,required:true}
})

let Food = mongoose.model('foods',foodSchame)

module.exports = Food