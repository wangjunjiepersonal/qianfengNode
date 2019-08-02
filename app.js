
//

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const db = require('./db/connect')
const Mail = require('./utils/mail.js')
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret : 'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
      maxAge : 1000 * 60 * 60 * 24, // 设置 session 的有效时间，单位毫秒
  },
}));


app.use('/public',express.static(path.join(__dirname,'./public')))
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
const User = require('./router/user.js')
const Food = require('./router/food.js')
const File = require('./router/file.js')

app.use('/user',User)
app.use('/food',(req,res,next) => {
	if (req.session.login) {
		next()
	} else {
		res.send({
			err:-999,
			msg:'请先登录'
		})
	}
},Food)
app.use('/file',File)

app.get('/login',(req,res) => {
	res.send({
		msg:'1'
	})
})

app.listen('3000',(res) => {
	console.log('express服务器正在运行中')
})