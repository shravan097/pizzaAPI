const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const Manager = require("../models/managerSchema");
const jwt = require("jsonwebtoken");
const key = require("../env");
const Store = require('../models/storeSchema');
const deliverySchema = require("../models/deliverySchema");


exports.getAll = (req,res,next)=>
{
	deliverySchema.find().exec()
	.then((result)=>
	{
		if(result.length<1){
			return res.status(409).json({
					message:"No Delivery Person Signed Up Yet!"
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