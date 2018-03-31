const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = require("../env");

const stores = require('../stores_list');
const storeSchema = require("../models/storeSchema.js")

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