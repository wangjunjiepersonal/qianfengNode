
const express = require('express')

'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
    // 创建发送邮件的请求对象
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: '310294582@qq.com', // generated ethereal user
            pass: 'mrqbzxnmkioccbbe'  // generated ethereal password
        }
    });

	function Send(mail,code){
		// 邮件信息
    let mailOptions = {
      from: '"Fred Foo ?" <310294582@qq.com>', // sender address
      to: mail, // list of receivers
      subject: 'Node.js网邀请您进行注册', // Subject line
      text: `你的验证码是 ${code} 有效期为1分钟`, // plain text body
      //html: '<b>欢迎你 换不回你的笑容</b>' // html body
    }
    return new Promise((resolve,reject) => {
    	// 发送邮件
	    transporter.sendMail(mailOptions, (error, info) => {
	      if (error) {
	          reject()
	      } else {
	      	resolve()
	      }
	    })
    })
    
	}
	
	module.exports = {
		Send
	}
