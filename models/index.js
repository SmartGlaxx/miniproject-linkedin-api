const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

const UserSchema = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	email : {type : String, required : true},
	password : {type : String, required: true},
})

UserSchema.plugin(findOrCreate)
const User = mongoose.model('User', UserSchema)
module.exports = User