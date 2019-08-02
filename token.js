const jwt = require('jsonwebtoken')

//随即字符串 私钥
let screat = 'asdfghjkl'

//载荷
let payload = {
	user:admin,
	password:123456
}

//产生一个token
let token = jwt.sign(screat,payload)

//验证token的合法性
jwt.verify(token,screat,(err,data) => {
	
})