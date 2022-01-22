// 引入套件
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

require('./config/mongoose')
const routes = require("./routes")

const app = express()
// 設定連接阜號
const port = 3000

// 設定樣板引擎
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定body-parser
app.use(express.urlencoded({ extended: true }))
// 設定method-override
app.use(methodOverride("_method"))
// 設定路由
app.use(routes)

// 啟動並監聽伺服器
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
