//连接数据库

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/1902',{useNewUrlParser: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('数据库连接成功')
})
