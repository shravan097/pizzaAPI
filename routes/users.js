const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const checkAuth = require("../authenticate");
const userController = require("../controllers/userController");


//Get all Manager
router.get("/getAll",checkAuth,userController.get_all);

//User Sign Up
router.post("/signup",userController.sign_up);

//User Log In
router.post("/login",userController.login);




//Insert a manager
// Must follow this Schema:
// 	_id: mongoose.Schema.Types.ObjectId,
// 	name: String,
// 	store_name: String,


// router.post("/",(req,res,next)=>
// {
// 	const manager = new Manager({
// 		_id:new mongoose.Types.ObjectId(),
// 		name: req.body.name,
// 		store_name: req.body.store_name
// 	});
// 	manager.save().then(result =>
// 	{
// 		console.log(result);
// 		res.status(201).json({
// 			message: "Inserting Manager",
// 			createdOn: Date.now()
// 		})
// 	}).catch(err=>{
// 		console.log(err);
// 		res.status(500).json({
// 			error:err
// 		});
// 	});

// });

// Manager Sign Up



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
