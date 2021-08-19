const express = require('express')
const router = express.Router()
const getController = require('../controllers')

const {getUsers, postUsers, checkPostUsers} = getController

router.get('/', getUsers)

router.post('/signup', postUsers)

router.post('/login', checkPostUsers)

module.exports = router