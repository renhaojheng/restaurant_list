const express = require('express')
const Restaurant = require('../../models/restaurant')
const router = express.Router()

// 載入主頁
router.get('/', (req, res) => {
  const sort = Number(req.query.sort)
  let sortBy = {}
  if (sort === 0) {
    sortBy = { name: 'asc' }
  } else if (sort === 1) {
    sortBy = { name: 'desc' }
  } else if (sort === 2) {
    sortBy = { category: 'asc' }
  } else if (sort === 3) {
    sortBy = { location: 'asc' }
  } else {
    sortBy = { _id: 'asc' }
  }
  Restaurant.find()
    .sort(sortBy)
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
// 搜尋餐廳
router.get('/search', (req, res) => {
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

module.exports = router