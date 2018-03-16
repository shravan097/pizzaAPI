const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Manager = require("../models/managerSchema");
const jwt = require("jsonwebtoken");
const key = require("../env");

exports.get_all = (req,res,next)=>
{
	console.log(process.env.JWT_KEY)
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
};

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
};

exports.login = (req,res,next)=>
{
	console.log(key.env.JWT_KEY);
	Manager.find({email:req.body.email})
	.exec()
	.then(manager =>{
		if(manager.length<1){
			return res.status(401).json({
				message:"Auth Failed"
			});
		}
		bcrypt.compare(req.body.password,manager[0].password,(err,result)=>
		{
			if(err){
				return res.status(401).json({
					message: "Auth Failed"
				});
			}
			if(result){
				const token = jwt.sign(
				{
					email: manager[0].email,
					managerId: manager[0]._id
				},
				key.env.JWT_KEY,
				{
					expiresIn:"1h"
				}
				);
				return res.status(200).json({
					message:"Auth Successful",
					token: token
				});
			}
			res.status(401).json({
				message:"Auth Failed!"
			});
		});
	})
	.catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};





