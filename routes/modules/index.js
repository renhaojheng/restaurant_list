const express = require('express')
const Restaurant = require('../../models/restaurant')
const router = express.Router()

// 載入主頁
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
// 搜尋餐廳
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  return Restaurant.find({
    $or: [{ name: { $regex: keyword, $options: 'i' } }, { category: { $regex: keyword, $options: 'i' } }]
  })
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.error(error))
})

module.exports = router