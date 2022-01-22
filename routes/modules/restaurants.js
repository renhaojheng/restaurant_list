const express = require('express')
const Restaurant = require('../../models/restaurant')
const router = express.Router()

// 新增餐廳資訊頁面
router.get('/new', (req, res) => {
  res.render('new')
})
// 新增餐廳資訊
router.post('/', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// 餐廳詳細資訊頁
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})
// 餐廳編輯頁
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})
// 編輯餐廳詳細資訊
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// 刪除餐廳資訊
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.remove()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router