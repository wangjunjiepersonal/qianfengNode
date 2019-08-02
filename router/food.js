const express = require('express')
const router = express.Router()
const Food = require('../db/model/Food.js')

//添加
router.post('/add',(req,res) => {
	let {name,price,desc,typename,typeid,img} = req.body
 	console.log(name,price,desc,typename,typeid,img)
	Food.insertMany({name,price,desc,typename,typeid,img}).then((data) => {
		res.send({
			err:0,
			msg:'添加成功'
		})
	}).catch((err) => {
		res.send({
			err:-1,
			msg:'添加失败'
		})
	})
	
})

//查询类型id
router.post('/getinfobytype',(req,res) => {
	let { typeid } = req.body
 	
	Food.find({typeid}).then((data) => {
		res.send({
			err:0,
			msg:'查询成功',
			list:data
		})
	}).catch((err) => {
		res.send({
			err:-1,
			msg:'查询失败'
		})
	})
})

//查询关键字
router.post('/getinfobykw',(req,res) => {
	let { kw } = req.body
	let reg = new RegExp(kw)
	Food.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]}).then((data) => {
		res.send({
			err:0,
			msg:'查询成功',
			list:data
		})
	}).catch((err) => {
		res.send({
			err:-1,
			msg:'查询失败'
		})
	})
	
})

//删除
router.post('/del',(req,res) => {
	let { _id } = req.body
	Food.remove({ _id })
	.then((data) => {
		res.send({
			err:0,
			msg:'删除成功'
		})
	}).catch((err) => {
		res.send({
			err:-1,
			msg:'删除失败'
		})
	})
})

//更改
router.post('/update',(req,res) => {
	let {name,price,desc,typename,typeid,img,_id} = req.body
	Food.update({_id},{name,price,desc,typename,typeid,img})
	.then((data) => {
		res.send({
			err:0,
			msg:'修改成功'
		})
	}).catch((err) => {
		res.send({
			err:-1,
			msg:'修改失败'
		})
	})
})

//分页
router.post('/getinfobypage',(req,res) => {
	let pageSize = req.body.pageSize || 5
	let page = req.body.page || 1
	let count = 0
	let allpage = 0
	Food.find().then((list) => {
		count = list.length
		return Food.find().limit(Number(pageSize)).skip((page - 1) * pageSize)
	})
	.then((data) => {
		allpage = Math.ceil(count / pageSize)
		res.send({
			err:0,
			msg:'数据请求成功',
			list:data,
			count,
			allpage
		})
	}).catch((err) => {
		res.send({
			err:-1,
			msg:'数据请求失败'
		})
	})
	
})

module.exports = router