const express = require('express')
const router = express.Router()
const User = require('../db/model/User.js')
const Mail = require('../utils/mail.js')

let codes = {}

//退出接口
router.get('/logout',(req,res) => {
	req.session.destroy()
	res.send({
		err:0,
		msg:'退出登录'
	})
})

router.post('/reg',(req,res) => {
	let {user,password,code} = req.body
	if (user && password && code) {
		//
		if (codes[mail] != code) {
			res.send({
				err:-5,
				msg:'验证码错误'
			})
		}
		//在数据库查询是否被注册
		User.find({user}).then((data) => {
			if (data.length == 0) {
				//用户名可以被注册
				return User.insertMany({user,password})
			} else {
				res.send({
					err:-3,
					msg:'该用户名已经被注册过了'
				})
			}
		}).then(() => {
			res.send({
				err:0,
				msg:'注册成功'
			})
		}).catch((err) => {
			res.send({
				err:-2,
				msg:'注册失败'
			})
		})
	} else {
		return res.send({
			err:-1,
			msg:'参数错误'
		})
	}
})

router.post('/login',(req,res) => {
	let {user,password} = req.body	
	console.log(user,password)
	if (user && password ) {
		//将用户的信息存储到session中
		req.session.login = true
		req.session.name = user
		User.find({user,password}).then((data) => {
//			console.log(data)
			if (data.length > 0) {
				res.send({
					err:0,
					msg:'登录成功'
				})
			} else {
				res.send({
					err:-2,
					msg:'用户名或密码不正确'
				})
			}
		})
	} else {
		return res.send({
			err:-1,
			msg:'参数错误'
		})
	}
})

//发送邮箱验证码
router.post('/getmailcode',(req,res) => {
	let { mail } = req.body
	let code = parseInt(Math.random() * 10000)
	if (mail) {
		Mail.Send(mail,code).then(() => {
			codes[mail] = code
			console.log(mail)
			res.send({
				error:0,
				msg:'邮箱验证发送成功',
			})
		}).catch((err) => {
			res.send({
				error:0,
				msg:'邮箱验证发送失败',
			})
		})
		
	} else {
		return res.send({
			error:-4,
			msg:'参数异常',
		})
	}
})

module.exports = router