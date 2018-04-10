const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = require("../env");
const chefSchema = require('../models/chefSchema');
const storeSchema = require("../models/storeSchema");
const managerSchema = require("../models/managerSchema");


// Get all the Registered/Pending Customers


/*
	Input:
		/manager/getAllPendingCustomers

	Output:
			[
	    {
	        "pending_customers": {
	            "email": [
	                "customer1@test.com"
	            ]
	        },
	        "_id": "5ac50b8705b94205bb2f72dd"
	    }
]



*/

exports.get_all_pending_customers = async (req,res,next) =>
{

	const selected_manager = await managerSchema.findOne({"email":req.userData.email},"store_affiliated_with").exec();



	storeSchema['store'].findOne({"name":selected_manager.store_affiliated_with},"pending_customers").exec()
	.then((result)=>
	{
		 res.status(202).json(result);
	}).catch((err)=>
	{
		return res.status(500).json({
			message:"Database Error",
			error: err
		})
	});
}



exports.get_all_registered_customers = async(req,res,next) =>
{
	const selected_manager = await managerSchema.findOne({"email":req.userData.email},"store_affiliated_with").exec();
	

	storeSchema['store'].findOne({"name":selected_manager.store_affiliated_with},"registered_customers").exec()
	.then((result)=>
	{
		 res.status(202).json(result);
	}).catch((err)=>
	{
		return res.status(500).json({
			message:"Database Error",
			error: err
		})
	});
}

exports.get_all_blacklisted_customers = async(req,res,next) =>
{
	const selected_manager = await managerSchema.findOne({"email":req.userData.email},"store_affiliated_with").exec();
	

	storeSchema['store'].findOne({"name":selected_manager.store_affiliated_with},"blacklisted_customers").exec()
	.then((result)=>
	{
		 res.status(202).json(result);
	}).catch((err)=>
	{
		return res.status(500).json({
			message:"Database Error",
			error: err
		})
	});
}


// I am doing a lot of DB calls in a single function.
// I  think a change to schema can lower the calls thus improving the efficiency.
// We may do this at the end.
//Approve Customer from Pending ( ie. move from pending to registered)

exports.approve_customer = async (req,res,next) =>
{
	const selected_manager = await managerSchema.findOne({"email":req.userData.email},"store_affiliated_with").exec();
	
	storeSchema['store'].findOne({"name":selected_manager.store_affiliated_with},"pending_customers registered_customers").exec()
	.then((result)=>
	{
		 res.status(202).json(result);
	}).catch((err)=>
	{
		return res.status(500).json({
			message:"Database Error",
			error: err
		})
	});
}



// Put Customer on BlackList








