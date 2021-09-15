const router = require('express').Router()
const  {getCategory,uploadCategoryImage, createCategory} = require('../controllers/uploadContollers')

router.get('/category/list/:kitchenId',getCategory)

router.post('/category/new', createCategory)

router.post('/category/imageUpload',uploadCategoryImage)

module.exports = router

