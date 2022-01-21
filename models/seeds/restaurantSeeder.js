const mongoose = require('mongoose')
const restaurantList = require('../../restaurant.json').results
const Restaurant = require('../restaurant.js')
mongoose.connect('mongodb://localhost/restaurant_list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("done!")
    })
    .catch(err => console.log(err))
})