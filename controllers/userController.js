const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const Manager = require("../models/managerSchema");
const Chef = require("../models/chefSchema");
const jwt = require("jsonwebtoken");
const key = require("../env");

const stores = require('../stores_list');
const storeSchema = require("../models/storeSchema.js")

exports.getStoreList = (req,res,next)=>
{
	return res.send(stores);
}
exports.get_all = (req,res,next)=>
{
	console.log(process.env.JWT_KEY)
	User.find()
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
	const typeOfUser = req.body.typeOfUser;


	//Manager Sign Up
	if(typeOfUser==="Manager")
	{


		
		//Check If User Exists
		User.find({email: req.body.email})
		.exec()
		.then(user =>{
			if(user.length >= 1){
				return res.status(409).json({
					message:"User Exist!"
				});
			}else{
				//Check if store is already registered
				storeSchema.find({name:req.body.store_affiliated_with})
						.exec()
						.then(store=>{
							if(store.length===1){
								return res.status(409).json({
									error_code:21,
									message:"Store already registered by a Manager"
								});
							}
						});
				bcrypt.hash(req.body.password,10,(err,hash)=>
				{
					if(err){
						return res.status(500).json({
							error: err
						});
					}else{
						const manager = new Manager(
						{
							_id: new mongoose.Types.ObjectId(),
							email:req.body.email,
							name: req.body.name,
							store_affiliated_with: req.body.store_affiliated_with

						});
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							email: req.body.email,
							password: hash,
							typeOfUser: req.body.typeOfUser
						});

						const storeModel = new storeSchema(
						{
							_id: new mongoose.Types.ObjectId(),
							name: req.body.store_affiliated_with,
							manager_email:req.body.email,
						});
						
						Promise.all([
							user.save(),
							manager.save(),
							storeModel.save()
							])
						.then(([userResult,managerResult,storeResult])=>
						{
							console.log(userResult);
							console.log(managerResult);
							console.log(storeResult);

							res.status(201).json({
							message:"Manager User Created!"});
						}).catch((err)=>
						{
							console.log("Error!")
							res.status(500).json(err);
							console.log('Promise Error Caught!');

						});
					}
				});
			}
		});
	}
	if(typeOfUser==="Chef")
	{
		let selected_store;
		storeSchema.find({name:req.body.store_affiliated_with})
		.exec()
		.then(store=>{
			if(store.length!=1){
				return res.status(409).json({
					error_code:20,
					message:"Store not registered by Manager yet"
				});
			}
			else{
				selected_store = store;
			}
		});

		User.find({email: req.body.email})
		.exec()
		.then(user =>{
			if(user.length >= 1){
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
						const chef = new Chef(
						{
							_id: new mongoose.Types.ObjectId(),
							email:req.body.email,
							name: req.body.name,
							store_affiliated_with: req.body.store_affiliated_with
						});
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							email: req.body.email,
							password: hash,
							typeOfUser: req.body.typeOfUser
						});
						console.log(selected_store[0])
						selected_store[0].chefs.email.push(req.body.email);

						Promise.all([
							user.save(),
							chef.save(),
							selected_store[0].save()])
						.then(([userResult,chefResult,storeResults])=>
						{
							console.log(userResult);
							console.log(chefResult);
							console.log(storeResults)

							res.status(201).json({
							message:"Chef User Created!"});
						}).catch((err)=>
						{
							console.log("Error!")
							res.status(500).json(err);
							console.log('Promise Error Caught!');

						});
					}
				});
			}
		});
	}



	// if(typeOfUser==="Customer")
	// {
	// 	User.find({email: req.body.email})
	// 	.exec()
	// 	.then(user =>{
	// 		if(user.length >= 1){
	// 			return res.status(409).json({
	// 				message:"User Exist!"
	// 			});
	// 		}else{
	// 			bcrypt.hash(req.body.password,10,(err,hash)=>
	// 			{
	// 				if(err){
	// 					return res.status(500).json({
	// 						error: err
	// 					});
	// 				}else{
	// 					const user = new User({
	// 						_id: new mongoose.Types.ObjectId(),
	// 						email: req.body.email,
	// 						password: hash,
	// 						typeOfUser: req.body.typeOfUser
	// 					});
	// 					user.save()
	// 					.then(result=>{
	// 						console.log(result);
	// 						res.status(201).json({
	// 							message:"User Created!"});
	// 					})
	// 					.catch(err=>
	// 					{
	// 						console.log(err);
	// 						res.status(500).json({error:err});
	// 					});
	// 				}
	// 			});
	// 		}
	// 	});
	// }

	// if(typeOfUser==="Delivery")
	// {
	// 	User.find({email: req.body.email})
	// 	.exec()
	// 	.then(user =>{
	// 		if(user.length >= 1){
	// 			return res.status(409).json({
	// 				message:"User Exist!"
	// 			});
	// 		}else{
	// 			bcrypt.hash(req.body.password,10,(err,hash)=>
	// 			{
	// 				if(err){
	// 					return res.status(500).json({
	// 						error: err
	// 					});
	// 				}else{
	// 					const user = new User({
	// 						_id: new mongoose.Types.ObjectId(),
	// 						email: req.body.email,
	// 						password: hash,
	// 						typeOfUser: req.body.typeOfUser
	// 					});
	// 					user.save()
	// 					.then(result=>{
	// 						console.log(result);
	// 						res.status(201).json({
	// 							message:"User Created!"});
	// 					})
	// 					.catch(err=>
	// 					{
	// 						console.log(err);
	// 						res.status(500).json({error:err});
	// 					});
	// 				}
	// 			});
	// 		}
	// 	});
	// }

	
};

exports.login = (req,res,next)=>
{
	console.log(key.env.JWT_KEY);
	User.find({email:req.body.email})
	.exec()
	.then(user =>{
		if(user.length<1){
			return res.status(401).json({
				message:"Auth Failed"
			});
		}
		if(user[0].typeOfUser != req.body.typeOfUser)
			throw "User Invalid!"
		bcrypt.compare(req.body.password,user[0].password,(err,result)=>
		{
			if(err){
				return res.status(401).json({
					message: "Auth Failed"
				});
			}
			if(result){
				const token = jwt.sign(
				{
					email: user[0].email,
					userId: user[0]._id
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





