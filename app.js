// 引入套件
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant.js')

// 設定連接阜號
const port = 3000

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

// 設定樣板引擎
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定body-parser
app.use(express.urlencoded({ extended: true }))

// 設定路由
// 載入主頁
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
// 餐廳詳細資訊頁
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})
// 餐廳編輯頁
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})
// 編輯餐廳詳細資訊
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const item = {
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  }
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = item.name
      restaurant.category = item.category
      restaurant.image = item.image
      restaurant.location = item.location
      restaurant.phone = item.phone
      restaurant.google_map = item.google_map
      restaurant.rating = item.rating
      restaurant.description = item.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// 刪除餐廳資訊
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.remove()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// 搜尋餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find({
    $or: [{ name: { $regex: keyword, $options: 'i' } }, { category: { $regex: keyword, $options: 'i' } }]
  })
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.error(error))
})


// 啟動並監聽伺服器
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
