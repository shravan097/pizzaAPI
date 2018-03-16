const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Manager = require("../models/managerSchema");

exports.get_all = (req,res,next)=>
{
	Manager.find()
	.exec()
	.then(docs=>{
		res.status(200).json(docs);
	})
	.catch(err=>{
		console.log(err);
		res.status(500).json({
			error:err
		});
	});
}

exports.sign_up = (req,res,next)=>
{
	Manager.find({email: req.body.email})
	.exec()
	.then(manager =>{
		if(manager.length >= 1){
			return res.status(409).json({
				message:"User Exist!"
			});
		}else{
			bcrypt.hash(req.body.password,10,(err,hash)=>
			{
				if(err){
					return res.status(500).json({
						error: err
					});
				}else{
					const manager = new Manager({
						_id: new mongoose.Types.ObjectId(),
						email: req.body.email,
						password: hash
					});
					manager.save()
					.then(result=>{
						console.log(result);
						res.status(201).json({
							message:"User Created!"});
					})
					.catch(err=>
					{
						console.log(err);
						res.status(500).json({error:err});
					});
				}
			});
		}
	});
}