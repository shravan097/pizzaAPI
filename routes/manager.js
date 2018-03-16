const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Manager = require("../models/managerSchema")
const bcrypt = require("bcrypt");

//Get all Manager
router.get("/getAll",(req,res,next) =>{
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
});


//Insert a manager
// Must follow this Schema:
// 	_id: mongoose.Schema.Types.ObjectId,
// 	name: String,
// 	store_name: String,


router.post("/",(req,res,next)=>
{
	const manager = new Manager({
		_id:new mongoose.Types.ObjectId(),
		name: req.body.name,
		store_name: req.body.store_name
	});
	manager.save().then(result =>
	{
		console.log(result);
		res.status(201).json({
			message: "Inserting Manager",
			createdOn: Date.now()
		})
	}).catch(err=>{
		console.log(err);
		res.status(500).json({
			error:err
		});
	});

});

// Manager Sign Up
router.post("/signup",(req,res,next)=>
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

});



// // Test Page
// router.post('/',(req,res,next) =>
// {
// 	const managerDB = {
// 		managerName: req.body.managerName,
// 		password: req.body.quantity
// 	};
// 	res.status(201).json(
// 		{
// 			message:' Manager Created',
// 			confirmed: true,
// 			managerDB: managerDB
// 		});
// });

// router.get('/',(req,res,next)=>
// {
// 	const managerDetail = {
// 		managerName: "jack",
// 		storeName : "Delicious Pizza Store",
// 		address: "123 Main Street",
// 		chef: 2,
// 		rating: 5
// 	};

// 	res.status(201).json({
// 		managerDetail:managerDetail
// 	});
// });

module.exports = router;
