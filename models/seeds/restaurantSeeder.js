const db = require('../../config/mongoose')
const restaurantList = require('../../restaurant.json').results
const Restaurant = require('../restaurant.js')

db.once('open', () => {
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("done!")
    })
    .catch(err => console.log(err))
})