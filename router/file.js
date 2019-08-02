const express = require('express')
const router = express.Router()
const multer = require('multer')
//const Food = require('../db/model/Food.js')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
  	//指定文件路径
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
  	//指定文件的名字
  	let ext = file.originalname.split('.')[file.originalname.split('.').length - 1]
  	let tmpname = (new Date()).getTime()
    cb(null, `${tmpname}.${ext}`)
  }
})

let upload = multer({
	storage
})

router.post('/upload',upload.single('file'),(req,res) => {
	let {size,mimetype,path} = req.file
	let types = ['jpg','jpeg','png','gif']
	let tmpType = mimetype.split('/')[1]  //获取后缀
	if (size >= (500*1024)) {
		return res.send({
			err:-1,
			msg:'图片尺寸过大'
		})
	} else if (types.indexOf(tmpType) == -1) {
		return res.send({
			err:-2,
			msg:'图片类型错误'
		})
	} else {
		let imgUrl = `public/uploads/${req.file.filename}`
		res.send({
			err:0,
			msg:'文件上传成功',
			img:imgUrl
		})
	}
	
})


module.exports = router