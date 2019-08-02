

//连接数据库

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/1902',{useNewUrlParser: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('数据库连接成功')
})

let userSchame = new mongoose.Schema({
	user:{type:String,required:true},
	password:{type:String,required:true},
	age:{type:Number},
	sex:{type:Number,default:0}
})

let User = mongoose.model('user',userSchame)

User.insertMany({user:'admin',password:'123456'}).then((res) => {
	console.log(res)
}).catch((err) => {
	console.log('插入失败')
})
