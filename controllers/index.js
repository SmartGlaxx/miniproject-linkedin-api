const User = require('../models')
const mongoose = require('mongoose')


const getUsers = (req, res, next)=>{
	User.find()
	.exec()
	.then(results =>{
		res.status(200).json({
			count : results.length,
			message : "Data recieved",
			data : results.map(result =>{
				return {
					_id : result._id,
					name : result.name,
					email : result.email,
					password  : result.password,
					phone : result.phone
				}
			})
		})
	}).catch(error =>{
		res.status(500).json({
			error : {
				message : "An error occured."
			}
		})
	})

}



const postUsers = (req, res)=>{
	const email = req.body.email
	
	const password = req.body.password
 
	const user = new User({
		_id : new mongoose.Types.ObjectId,
		email : req.body.email,
		password : req.body.password
	})

	const newer = User.findOne({email : email},function (err, docs) {
        if (docs){
             //console.log(docs);
           
                if(password.length < 6){
            	res.json({
					message : "Password length"
				})
            	}
            	else if(docs.email == email){
            	res.json({
					message : "Email exists"
				})
            	}
          
        }
        else{
            user.save()
			.then(result =>{
				res.status(200).json({
					message : "User signed-up.",
					data  : result
				})
        })
    }
     } )


}




const checkPostUsers = (req, res)=>{
	const email = req.body.email
	const password = req.body.password

	const newer = User.findOne({email : email},function (err, docs) {
        if (docs){
           		if(password.length < 6){
            	res.json({
					message : "Password length"
				})
            	}
            	else if(docs.email == email && docs.password == password){
            		res.status(200).json({
            			message:"success"
            		})
            	}else{
            		res.status(200).json({
            			message:"failed"
            		})
            	}
          
        }else{
        	console.log('no user')
    } } )


}



userControllers = {getUsers, postUsers, checkPostUsers} 
module.exports = userControllers