const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = require("../env");
const chefSchema = require('../models/chefSchema')
const stores = require('../stores_list');
const storeSchema = require("../models/storeSchema")

exports.get_all_unregistered = (req,res,next)=>
{
	return res.send(stores);
}

exports.get_all = (req,res,next)=>
{
	storeSchema.find().exec()
	.then((result)=>
	{
		if(result.length<1){
			return res.status(409).json({
					message:"No Store Registered by Manager Yet!"
				});
		}else
		{
			return res.status(202).json(result);
		}
	}).catch((err)=>
	{
		return res.status(500).json({
			message:"Database Error",
			error: err
		})
	});
}

/*
	Finds Chef Details
	Input: Chef email given on URL 
	Output: JSON Data of that chef
	Example: /store/getChef/chef1@test.com
*/

exports.find_Chef_by_email = (req,res,next) =>
{
	console.log(req.params);
	chefSchema['chef'].findOne(req.params)
	.then(result=>{
		if(result)
		{
			return res.status(202).json(result);
		}else
		{
			return res.status(409).json({
					message:"No Chef under that email found!"
				});
		}
	}).catch(err=>{
		return res.status(500).json({
					message:"Finding Chef Database Error!"
				});
	});
}