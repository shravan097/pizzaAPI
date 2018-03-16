const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Manager = require("../models/managerSchema")

//Get all Manager
router.get("/",(req,res,next) =>{
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
