const mongoose = require('mongoose')
const CategorySchema = require('../models/categories')
const path = require('path')
const cloudinary = require('cloudinary').v2

const getCategory = async(req, res)=>{
	const kitchenId = req.params.kitchenId
	CategorySchema.find({kitchen_id:kitchenId})
	.exec()
   .then(results => {
   res.status(200).json({results})
   }).catch(error =>console.log(error))
}

const uploadCategoryImage = async(req, res)=>{
	// const imageFile = req.files.image
	// const imagePath = path.join(__dirname, "../public/uploads/" + imageFile.name)
	// const response = await imageFile.mv(imagePath)
	// res.status(200).json({
	// 	image : {src : `/uploads/${imageFile.name}`}
	// })

	const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{
		use_filename : true,
		folder : "wakafoods_uploads"
	})
	res.status(200).json({secure_url: result.secure_url})
}
const createCategory = async(req, res)=>{

	const response = new CategorySchema({
	_id : mongoose.Types.ObjectId(),
	image : 'image',
	kitchen_id : req.body.kitchen_id,
	name : req.body.name,
	})
	await res.status(200).json({message : response})
	await response.save()
}

module.exports = {getCategory, uploadCategoryImage, createCategory}

