const mongoose = require('mongoose')

// 連結資料庫
mongoose.connect('mongodb://localhost/restaurant_list')

// 檢視與資料庫的連線狀態
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db