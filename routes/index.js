const express = require('express')
const router = express.Router()
const home = require('./modules/index')
const restaurants = require('./modules/restaurants')

router.use('/', home)
router.use('/restaurants', restaurants)

module.exports = router